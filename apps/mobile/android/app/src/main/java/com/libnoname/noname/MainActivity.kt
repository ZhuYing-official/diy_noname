package com.libnoname.noname

import android.os.Bundle
import android.util.Log
import com.getcapacitor.BridgeActivity
import com.tencent.smtt.sdk.QbSdk

class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 初始化 X5 内核
        initX5Core()

        // 注册插件
        registerPlugin(SafFsPlugin::class.java)
    }

    private fun initX5Core() {
        // 收集 X5 内核初始化信息
        val cb = object : QbSdk.PreInitCallback {
            override fun onViewInitFinished(arg0: Boolean) {
                // X5 内核初始化完成回调
                if (arg0) {
                    Log.d("X5", "X5 内核加载成功")
                } else {
                    Log.e("X5", "X5 内核加载失败，将使用系统内核")
                }
            }

            override fun onCoreInitFinished() {
                // X5 核心初始化完成回调
                Log.d("X5", "X5 核心初始化完成")
            }
        }

        // 初始化 X5 环境
        QbSdk.initX5Environment(applicationContext, cb)

        // 设置 X5 内核下载策略
        QbSdk.setDownloadWithoutWifi(true) // 允许非 WiFi 环境下载
    }
}
