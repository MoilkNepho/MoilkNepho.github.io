---
layout: post
title: 校园卡终端(qt5)
tags:  [qt,校园卡,终端,RFID,IC卡,饭卡,系统,c++,S50卡]
categories: [qt]
author: Moilk
excerpt: "在Qt5下实现的校园卡系统，使用S50卡和高频读写器模拟校园卡消费的全过程"
---

------------------------------------------------------------
## 校园卡终端（Campus Card Terminal）v1.2
------------------------------------------------------------
--------> [源码下载](https://codeload.github.com/Moilk/CampusCardTerminal/zip/master) [程序下载](https://codeload.github.com/Moilk/CampusCardTerminal/zip/release)  

+ 系 统 名: 校园卡支付管理系统  
+ 开 发 者: Moilk、Pivot  
+ 联系方式: moilk@qq.com  
+ 开发工具: Qt 5.5.1 (MSVC 2013, 64位)  
+ 数 据 库: MySQL 5.7.10 Community Server  
+ 安装方法: 绿色软件，解压后双击CCT.exe即可打开  
+ 实现功能: 发卡、挂失、补卡、销卡、充值、消费以及消费记录查询  
+ github: [CampusCardTerminal-Github](https://github.com/Moilk/CampusCardTerminal)
+ 备    注:   
	a)系统假设卡的密钥A初始值为全ff，发卡操作后密钥A为aabbccddeeff，销卡后密钥A恢复为全ff，同时被使用的数据块清空；  
	b)管理界面:  
		登录名：1234  
		密  码：1234  
	  消费界面:  
		登录名：0001  
		密  码：1234  
	c)软件必须在读写器以及数据库连接的情况下使用，否则为防止系统异常所有功能将被置为不可用的状态；  
+ 使用的读写器  
![reader.png](http://duras.wang/img/projects/CampusCardTerminal/reader.png)  

+ 图形界面

	* 主页   
![图形界面.png](http://duras.wang/img/projects/CampusCardTerminal/主页.png)  
	* 管理界面   
![管理.png](http://duras.wang/img/projects/CampusCardTerminal/管理.png)  
	* 消费界面  
![消费.png](http://duras.wang/img/projects/CampusCardTerminal/消费.png)  
	* 查询界面   
![查询.png](http://duras.wang/img/projects/CampusCardTerminal/查询.png)  

-------------------------------------------------------------

--------> [源码下载](https://codeload.github.com/Moilk/CampusCardTerminal/zip/master) [程序下载](https://codeload.github.com/Moilk/CampusCardTerminal/zip/release)  
2015/12/23 20:12


