package com.thucuc;

import android.app.AppOpsManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.lang.reflect.Method;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

class OtherPermissionModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;
    private static String TAG = "OtherPermissionModule";

    OtherPermissionModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "OtherPermission";
    }

    private void gotoAppSetting(Context context){
        Intent intent = new Intent();
        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        Uri uri = Uri.fromParts("package", context.getPackageName(), null);
        intent.setData(uri);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    private void goToXiaomiPermissions(Context context){
        Intent intent = new Intent("miui.intent.action.APP_PERM_EDITOR");
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setClassName("com.miui.securitycenter", "com.miui.permcenter.permissions.PermissionsEditorActivity");
        intent.putExtra("extra_pkgname", context.getPackageName());
        context.startActivity(intent);
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void hasPermission(Promise p) {
        boolean canDraw = Settings.canDrawOverlays(reactContext);
        if (canDraw == false) {
            p.resolve(false);
            return;
        }
        AppOpsManager ops = (AppOpsManager) reactContext.getSystemService(Context.APP_OPS_SERVICE);
        try {
            int op = 10021;
            Method method = ops.getClass().getMethod("checkOpNoThrow", new Class[]{int.class, int.class, String.class});
            Integer result = (Integer) method.invoke(ops, op, android.os.Process.myUid(), reactContext.getPackageName());
            p.resolve(result == AppOpsManager.MODE_ALLOWED);
            return;
        } catch (Exception e) {
            Log.e(TAG, "not support");
        }
        p.resolve(false);
    }

    @ReactMethod
    public void getManufacturer(Promise p) {
        String manufacturer = android.os.Build.MANUFACTURER;
        p.resolve(manufacturer);
    }

    @ReactMethod
    public void showSetting(){
        String manufacturer = android.os.Build.MANUFACTURER;
        if ("xiaomi".equalsIgnoreCase(manufacturer)) {
            goToXiaomiPermissions(reactContext);
        } else {
            gotoAppSetting(reactContext);
        }
    }
}
