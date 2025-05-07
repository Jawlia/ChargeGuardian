package com.chargeguardian

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.media.AudioAttributes
import android.media.MediaPlayer
import android.net.Uri
import android.os.BatteryManager
import android.os.VibrationEffect
import android.os.Vibrator
import com.facebook.react.bridge.*

class BatteryModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var mediaPlayer: MediaPlayer? = null

    override fun getName(): String = "BatteryModule"

    // ✅ Temperature
    @ReactMethod
    fun getBatteryTemperature(promise: Promise) {
        try {
            val intent = reactApplicationContext.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
            val temperature = intent?.getIntExtra(BatteryManager.EXTRA_TEMPERATURE, -1)?.toFloat()?.div(10)
            promise.resolve(temperature)
        } catch (e: Exception) {
            promise.reject("BATTERY_TEMP_ERROR", e.message)
        }
    }

    // ✅ Health
    @ReactMethod
    fun getBatteryHealth(promise: Promise) {
        try {
            val intent = reactApplicationContext.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
            val health = intent?.getIntExtra(BatteryManager.EXTRA_HEALTH, -1) ?: -1
            val healthStatus = when (health) {
                BatteryManager.BATTERY_HEALTH_GOOD -> "Good"
                BatteryManager.BATTERY_HEALTH_OVERHEAT -> "Overheat"
                BatteryManager.BATTERY_HEALTH_DEAD -> "Dead"
                BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE -> "Over Voltage"
                BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE -> "Failure"
                BatteryManager.BATTERY_HEALTH_COLD -> "Cold"
                else -> "Unknown"
            }
            promise.resolve(healthStatus)
        } catch (e: Exception) {
            promise.reject("BATTERY_HEALTH_ERROR", e.message)
        }
    }

    // ✅ Capacity
    @ReactMethod
    fun getBatteryCapacity(promise: Promise) {
        try {
            val powerProfileClass = Class.forName("com.android.internal.os.PowerProfile")
            val constructor = powerProfileClass.getConstructor(Context::class.java)
            val powerProfile = constructor.newInstance(reactApplicationContext)
            val batteryCapacityMethod = powerProfileClass.getMethod("getBatteryCapacity")
            val capacity = batteryCapacityMethod.invoke(powerProfile) as Double
            promise.resolve(capacity)
        } catch (e: Exception) {
            promise.reject("BATTERY_ERROR", "Could not read battery capacity", e)
        }
    }

    // ✅ Technology
    @ReactMethod
    fun getBatteryTechnology(promise: Promise) {
        try {
            val intent = reactApplicationContext.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
            val technology = intent?.getStringExtra(BatteryManager.EXTRA_TECHNOLOGY) ?: "Unknown"
            promise.resolve(technology)
        } catch (e: Exception) {
            promise.reject("BATTERY_TECH_ERROR", e.message)
        }
    }

    // ✅ Play alarm using Uri with volume, repeat, and vibration
    @ReactMethod
    fun playAlarm(fileName: String, volume: Double, vibration: Boolean, repeat: Boolean) {
        val context: Context = reactApplicationContext
        val resId = context.resources.getIdentifier(fileName, "raw", context.packageName)

        if (resId != 0) {
            stopAlarm()

            val uri = Uri.parse("android.resource://${context.packageName}/$resId")
            mediaPlayer = MediaPlayer.create(context, uri)

            mediaPlayer?.apply {
                isLooping = repeat
                setVolume(volume.toFloat(), volume.toFloat())
                setAudioAttributes(
                    AudioAttributes.Builder()
                        .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                        .setUsage(AudioAttributes.USAGE_ALARM)
                        .build()
                )
                start()
            }

            if (vibration) {
                val vibrator = context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
                if (vibrator.hasVibrator()) {
                    vibrator.vibrate(
                        VibrationEffect.createOneShot(1500, VibrationEffect.DEFAULT_AMPLITUDE)
                    )
                }
            }
        }
    }

    // ✅ Stop alarm
    @ReactMethod
    fun stopAlarm() {
        mediaPlayer?.let {
            if (it.isPlaying) it.stop()
            it.release()
            mediaPlayer = null
        }
    }

    // ✅ Schedule alarm
    @ReactMethod
    fun scheduleBatteryAlarm(type: String, timeMillis: Double) {
        AlarmHelper.scheduleAlarm(reactApplicationContext, type, timeMillis.toLong())
    }

    // ✅ Cancel alarm
    @ReactMethod
    fun cancelBatteryAlarm(type: String) {
        AlarmHelper.cancelAlarm(reactApplicationContext, type)
    }

    // ✅ Battery Level
    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        try {
            val intent = reactApplicationContext.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
            val level = intent?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
            promise.resolve(level)
        } catch (e: Exception) {
            promise.reject("BATTERY_LEVEL_ERROR", e.message)
        }
    }

    // ✅ Combined battery status
   @ReactMethod
    fun getBatteryStatus(promise: Promise) {
        try {
            val intent = reactApplicationContext.registerReceiver(
                null,
                IntentFilter(Intent.ACTION_BATTERY_CHANGED)
            )

            val level = intent?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
            val scale = intent?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1

            val status = intent?.getIntExtra(BatteryManager.EXTRA_STATUS, -1)
            val isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING ||
                            status == BatteryManager.BATTERY_STATUS_FULL

            val batteryPct = if (level >= 0 && scale > 0) level.toFloat() / scale else 0f

            val map = Arguments.createMap()
            map.putDouble("level", batteryPct.toDouble())  // 0.0 to 1.0
            map.putBoolean("charging", isCharging)

            promise.resolve(map)
        } catch (e: Exception) {
            promise.reject("BATTERY_STATUS_ERROR", e.message)
        }
    }
}
