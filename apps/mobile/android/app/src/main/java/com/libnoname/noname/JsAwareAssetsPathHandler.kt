package com.libnoname.noname

import android.content.Context
import android.util.Log
import android.webkit.MimeTypeMap
import android.webkit.WebResourceResponse
import androidx.webkit.WebViewAssetLoader
import java.io.IOException

class JsAwarePathHandler(
    private val context: Context,
    private val basePath: String?
) : WebViewAssetLoader.PathHandler {

    override fun handle(path: String): WebResourceResponse? {
        return try {
            // 1. 基础校验
            if (path.isNullOrEmpty()) {
                Log.e("NonameFileServer", "Path is null or empty")
                return null
            }

            // 2. 路径标准化处理
            val normalized = path.trimStart('/')
                .replace(".pnpm", "_pnpm")
                .replace(Regex("^/+"), "")  // 确保路径不以多个斜杠开头
                .replace(Regex("/+"), "/")  // 规范化路径中的多个斜杠

            // 3. 确保路径有效
            if (normalized.isEmpty()) {
                Log.e("NonameFileServer", "Normalized path is empty for: $path")
                return null
            }

            // 4. 构建完整资源路径
            val assetPath = if (basePath != null) {
                "$basePath/$normalized"
            } else {
                normalized
            }

            // 5. 检查资源是否存在
            if (!assetExists(assetPath)) {
                Log.e("NonameFileServer", "Asset not found: $assetPath")
                Log.e("NonameFileServer", "Original path: $path")
                Log.e("NonameFileServer", "Normalized path: $normalized")
                return null
            }

            // 6. 打开资源流
            val inputStream = context.assets.open(assetPath)

            // 7. 获取 MIME 类型
            val mimeType = guessMimeType(assetPath)

            // 8. 返回响应
            WebResourceResponse(mimeType, "UTF-8", inputStream)

        } catch (e: IOException) {
            Log.e("NonameFileServer", "Failed to fetch $path: ${e.message}")
            null
        } catch (e: Exception) {
            Log.e("NonameFileServer", "Unexpected error fetching $path: ${e.message}", e)
            null
        }
    }

    private fun assetExists(path: String): Boolean {
        return try {
            // 记录尝试访问的路径
            Log.d("NonameFileServer", "Checking asset: $path")

            // 列出 assets 根目录内容
            context.assets.list("")?.let {
                Log.d("NonameFileServer", "Assets root: ${it.joinToString()}")
            }

            // 列出 public 目录内容
            context.assets.list("public")?.let {
                Log.d("NonameFileServer", "Assets in public/: ${it.joinToString()}")
            }

            context.assets.list(path)?.isNotEmpty() == true ||
                    context.assets.open(path).use { true }
        } catch (e: IOException) {
            Log.e("NonameFileServer", "Asset check failed for $path: ${e.message}")
            false
        }
    }

    private fun guessMimeType(path: String): String {
        return when {
            path.endsWith(".js") -> "application/javascript"
            path.endsWith(".mjs") -> "application/javascript"
            path.endsWith(".json") -> "application/json"
            path.endsWith(".css") -> "text/css"
            path.endsWith(".html") -> "text/html"
            path.endsWith(".map") -> "application/json"
            path.endsWith(".vue") -> "text/javascript"
            path.endsWith(".ts") -> "text/javascript"
            else -> {
                val ext = MimeTypeMap.getFileExtensionFromUrl(path)
                MimeTypeMap.getSingleton().getMimeTypeFromExtension(ext)
                    ?: "application/octet-stream"
            }
        }
    }
}
