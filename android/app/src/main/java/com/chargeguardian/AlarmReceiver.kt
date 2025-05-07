package com.chargeguardian

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import com.facebook.react.HeadlessJsTaskService

class AlarmReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        val type = intent?.getStringExtra("type")

        if (type == "powerChange") {
            // Charger connect/disconnect hua hai
            val serviceIntent = Intent(context, BatteryAlarmService::class.java)
            serviceIntent.putExtra("type", "powerChange") // React Native side me milega
            context.startService(serviceIntent)
            HeadlessJsTaskService.acquireWakeLockNow(context)
        } else {
            // Full ya Low alarm ke liye default logic
            val serviceIntent = Intent(context, BatteryAlarmService::class.java)
            serviceIntent.putExtra("type", "full") // ya low based on actual call
            context.startService(serviceIntent)
            HeadlessJsTaskService.acquireWakeLockNow(context)
        }
    }
}
