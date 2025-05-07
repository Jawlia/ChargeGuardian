package com.chargeguardian

import android.content.Intent
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.jstasks.HeadlessJsTaskConfig
import com.facebook.react.bridge.Arguments
import com.facebook.react.ReactApplication

class BatteryAlarmService : HeadlessJsTaskService() {
    override fun getTaskConfig(intent: Intent?): HeadlessJsTaskConfig? {
        val extras = intent?.extras ?: return null

        // Ensure React context is available
        val application = applicationContext as ReactApplication
        val reactInstanceManager = application.reactNativeHost.reactInstanceManager
        if (!reactInstanceManager.hasStartedCreatingInitialContext()) {
            reactInstanceManager.createReactContextInBackground()
        }

        return HeadlessJsTaskConfig(
            "BatteryAlarmTask",
            Arguments.fromBundle(extras),
            5000,
            true
        )
    }
}
