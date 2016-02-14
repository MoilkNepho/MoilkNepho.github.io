---
layout: post
title: Android四大核心组件(forTest)
tags:  [Android]
categories: [Android开发]
author: Moilk
excerpt: "Android开发基础篇"
---
## Activity

#### 1\. 概念

* 一个Activity是一个应用程序组件，提供一个屏幕，用户可以用来交互为了完成某项任务，例如拨号、拍照、发送email、看地图。每一个activity被给予一个窗口，在上面可以绘制用户接口。窗口通常充满屏幕，但也可以小于屏幕而浮于其它窗口之上。
* 一个application通常包含各种各样的activity，这些activity彼此间没有紧密的约束。通常，有一个activity作为application首次运行所展示的界面。然后每个activity又可以启动其他activity来执行不同的操作，每当一个新的activity启动时，先前的activity停止工作，被操作系统保存在回收栈中。当一个新的activity启动时，它就被压入栈中并取得”user focus“，当用户处理完当前activity返回时，这个activity从栈中pop出来，先前的activity恢复运行。
* 当一个activity因为另一个activity的启动而停止，这种状态的改变会通过activity生命周期的回调方法产生通知。因为状态的改变一个activity可能会接收到几个回调方法的通知，比如系统是不是创建、停止、恢复或者销毁了它。这些回调方法为你提供了一个机会来执行特定的操作以回应状态的改变。比如当一个activity停止时，你的activity需要释放掉一些提供网络或者数据库连接的对象；当一个activity恢复时，需要重新获取一些必要的资源，恢复被中断的操作。

#### 2\. 三种状态

* 运行
* 停止
* 暂停

#### 3\. 生命周期的七个方法

![Android生命周期](http://images.cnitblog.com/blog/321721/201406/052325403028744.png)

#### 4\. Activity的操作

* 开启另一个Activity:

```java
Intent intent = new Intent(MainActivity.this, Main2Activity.class);
startActivity(intent);
```

* 关闭Activity: finish();

#### 5\. Activity的数据传递

* 简单数据

```java
intent.putExtra("text","简单数据传递");   // 在传出数据的Activity中
...
getIntent().getStringExtra("text"); // 在传入数据的Activity中，返回对应类型
```

* 复杂数据

```java
// 在传出数据的Activity中
Bundle bundle=new Bundle();
bundle.putString("text","复杂数据传输");
intent.putExtras(bundle);
...
// 在传入数据的Activity中
Bundle bundle=getIntent().getExtras();
tvOut.setText(bundle.getString("text"));
```

* 回传

```java
// 在即将被关闭的Activity中
Intent intent=new Intent();
intent.putExtra("result","返回数据");
setResult(0,intent);
...
// 在接收结果的Activity中

// 不用startActivity()
startActivityForResult(intent,0);
...
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
String result=data.getStringExtra("result");
tvOut.setText(result);

super.onActivityResult(requestCode, resultCode, data);
}
```

## Service

* 创建Service

```java
// 新建一个类继承Service
//Service的生命周期函数就onCreate和onDestroy两个
public class EchoService extends Service {
@Nullable
@Override
public IBinder onBind(Intent intent) {
        return null; // 返回调度者
      }

      @Override
      public void onCreate() {
      System.out.println("onCreate()");
      super.onCreate();
    }

    @Override
    public void onDestroy() {
    System.out.println("onDestroy()");
    super.onDestroy();
  }
}

// 像启动一个Activity一样启动Service
private serviceIntent=new Intent(this,EchoService.class);
// Service要由系统调度，不能自己new一个出来
startService(serviceIntent);
// 停止Service
stopService(serviceIntent);
```

* Activity与Service的连接

```java
// 绑定服务，此时要求Activity继承ServiceConnection接口
// 实现onServiceConnected和onServiceDisconnected函数
bindService(serviceIntent,this, Context.BIND_AUTO_CREATE);
...
// 在Service中，建立调度者内部类
public class EchoServiceBinder extends Binder {
        /**
         * 得到服务的实例
         * @return 服务的实例
         */
         public EchoService getService() {
         return EchoService.this;
       }
     }

// onBind函数要返回调度者的类
private final EchoServiceBinder echoServiceBinder = new EchoServiceBinder();

@Override
public IBinder onBind(Intent intent) {
System.out.println("onBind()");
return echoServiceBinder;
}
// 这样，在Activity与Service绑定时就会触发onServiceConnected函数
// onServiceConnected的两个参数name为被绑定的Service，service为调度者
public void onServiceConnected(ComponentName name, IBinder service) {
System.out.println("onServiceConnected()");
        // 调用调度者的getService()函数得到Service的引用，
        // 这样便可在Activity中得到Service的数据
        echoService= ((EchoService.EchoServiceBinder) service).getService();
      }
      ```

      ## Broadcast Receiver

      说明： 广播接收者 缺点：反应比较慢、不能用来传输大数据；

      * 静态注册

      ```java
      // 新建一个类继承BroadcastReceiver
      public class MyBC extends BroadcastReceiver {
      @Override
      public void onReceive(Context context, Intent intent) {
      System.out.println("onReceive():"+intent.getStringExtra("text"));
    }
  }
  ...
  // 在AndroidManife.xml里边添加一个recevice
  <receiver android:name=".MyBC"> </receiver>
  ...
  // 在Activity中向MyBC发送一个广播，receiver中便可接收到
  Intent intent=new Intent(MainActivity.this,MyBC.class);
  intent.putExtra("text","moilk");
  sendBroadcast(intent);
  ```

  * 动态注册、注销

  ```java
  // 首先，不用在AndroidManifest中生命receiver
  // 创建一个接收器对象
  private final MyBC myBC=new MyBC();
  // 注册接收器
  registerReceiver(myBC, new IntentFilter(MyBC.ACTION));
  // 其中，
  public static final String ACTION="com.moilk.usingbc.intent.action.MyBC";
  // 注销接收器
  unregisterReceiver(myBC);
  ```

  ## ContentProvider

  * ContentProvider的用法：获取联系人

  ```java
  Cursor cursor=getContentResolver().query(ContactsContract.Contacts.CONTENT_URI, null, null, null, null);
  while (cursor.moveToNext()) {
  System.out.println(">>>>>>>"
  +cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME)));
}
```


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{ site.description }}</title>

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="apple-touch-img/logo-precomposed" href="http://duras.wang/img/logo.png">
  <link rel="apple-touch-img/logo" href="http://duras.wang/img/logo.png">
  <link rel="apple-touch-img/logo" sizes="72x72" href="http://duras.wang/img/logo.png">
  <link rel="apple-touch-img/logo" sizes="114x114" href="http://duras.wang/img/logo.png">

  <link href="http://duras.wang/css/styles.css" rel="stylesheet" type="text/css">
  <link href="http://duras.wang/img/favicon.ico" rel="shortcut icon">
  <link rel="stylesheet" href="http://duras.wang/css/prettify/prettify.css">
</head>
<body>
  <div class="sidebar">
    <a href="http://duras.wang" class="logo">
      <img src="http://duras.wang/img/logo.png">
    </a>

    <ul class="nav">
      <div class="nav-inner">
        <li><a href="http://duras.wang/Blog"><span class="icon doc"></span>blog</a></li>
        <li><a href="/projects"><span class="icon code"></span>projects</a></li>
        <li><a href="http://github.com/moilknepho"><span class="icon github"></span>github</a></li>
        <li><a href="/ "><span class="icon info"></span>about</a></li>
      </div>
    </ul>
  </div>
  <div class="wrapper">
    <!--<h1><marquee scrolldelay="60">otter pop - the world's greatest jekyll theme</marquee></h1>-->
    <h1><i class="fa fa-bookmark-o"></i>{{page.title}}</h1>
    {{ content }}
  </div>
  <script type="text/javascript">
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-33073396-1', 'tybenz.com');
    ga('send', 'pageview');

  </script>

  <!-- 代码高亮 -->
  <script type="text/javascript" src="http://duras.wang/css/prettify/prettify.js"></script>
  <script type="text/javascript">
    $(function(){
      $('pre').addClass("prettyprint");
      prettyPrint();
    });
  </script>

</body>
</html>
```