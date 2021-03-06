package com.thucuc;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import androidx.annotation.NonNull;

public class RNDrawOverlayPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
      List<NativeModule> modules = new ArrayList<>();
      modules.add(new RNDrawOverlayModule(reactContext));
      return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
      return Collections.emptyList();
    }
}

// package com.thucuc;

// import com.facebook.react.ReactPackage;
// import com.facebook.react.bridge.NativeModule;
// import com.facebook.react.bridge.ReactApplicationContext;
// import com.facebook.react.uimanager.ViewManager;

// import java.util.ArrayList;
// import java.util.Collections;
// import java.util.List;

// import androidx.annotation.NonNull;

// class OtherPermissionPackage implements ReactPackage {
//     @NonNull
//     @Override
//     public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
//         List<NativeModule> modules = new ArrayList<>();
//         modules.add(new OtherPermissionModule(reactContext));
//         return modules;
//     }

//     @NonNull
//     @Override
//     public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
//         return Collections.emptyList();
//     }
// }
