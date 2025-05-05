package com.chargeguardian

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.media.MediaPlayer
import android.os.BatteryManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BatteryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var mediaPlayer: MediaPlayer? = null

    override fun getName(): String {
        return "BatteryModule"
    }

    // ✅ Temperature
    @ReactMethod
    fun getBatteryTemperature(promise: Promise) {
        try {
            val intent = reactApplicationContext.registerReceiver(
                null,
                IntentFilter(Intent.ACTION_BATTERY_CHANGED)
            )
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
            val intent = reactApplicationContext.registerReceiver(
                null,
                IntentFilter(Intent.ACTION_BATTERY_CHANGED)
            )
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
            val intent = reactApplicationContext.registerReceiver(
                null,
                IntentFilter(Intent.ACTION_BATTERY_CHANGED)
            )
            val technology = intent?.getStringExtra(BatteryManager.EXTRA_TECHNOLOGY) ?: "Unknown"
            promise.resolve(technology)
        } catch (e: Exception) {
            promise.reject("BATTERY_TECH_ERROR", e.message)
        }
    }

    // ✅ Play alarm/ringtone
    @ReactMethod
    fun playAlarm(fileName: String) {
        val context: Context = reactApplicationContext
        val resId = context.resources.getIdentifier(fileName, "raw", context.packageName)

        if (resId != 0) {
            stopAlarm()  // Stop previous sound
            mediaPlayer = MediaPlayer.create(context, resId)
            mediaPlayer?.isLooping = false
            mediaPlayer?.start()
        }
    }

    // ✅ Stop alarm/ringtone
    @ReactMethod
    fun stopAlarm() {
        mediaPlayer?.let {
            if (it.isPlaying) {
                it.stop()
            }
            it.release()
            mediaPlayer = null
        }
    }
}