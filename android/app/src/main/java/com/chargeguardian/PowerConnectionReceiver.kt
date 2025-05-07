package com.chargeguardian

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.ReactApplication
import com.facebook.react.modules.core.DeviceEventManagerModule

class PowerConnectionReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val reactContext = (context.applicationContext as ReactApplication)
            .reactNativeHost
            .reactInstanceManager
            .currentReactContext

        reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("PowerEvent", intent.action)

        val serviceIntent = Intent(context, BatteryAlarmService::class.java)
        serviceIntent.putExtra("type", "powerChange")
        context.startService(serviceIntent)
        HeadlessJsTaskService.acquireWakeLockNow(context)
    }
}
