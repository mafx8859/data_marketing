<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">
    <title>犀牛角</title>
    <link rel="stylesheet" type="text/css" href="css/login.css">
    <style type="text/css">

    </style>
<body>
<div class="whole">
    <div class="all">
        <div class="tyg-div-denglv">
            <div class="tyg-div-form">
                <form action="${pageContext.request.contextPath}/user/login" method="post">
                    <h2>登陆</h2>
                    <div style="margin:5px 10px;">
                        <label for="userName">用户名:</label>
                        <input name="username" type="text" placeholder="请输入用户名" id="userName"/>
                    </div>
                    <div style="margin:5px 10px;">
                        <label for="password" id="pwd">密码:</label>
                        <input name="password" type="password" placeholder="请输入密码" id="password"/>
                    </div>
                    <div style="margin:5px 10px;">
                        <label for="checkcode">验证码:</label>
                        <input type="text" style="width:150px;" placeholder="请输入验证码" id="checkcode"/>
                        <img src="img/1.png" style="vertical-align:bottom;" alt="验证码"/>
                    </div>
                    <span id="left"><a href="reg.html">注册新用户</a></span>
                    <span id="right"><a href="#">忘记密码?</a></span>
                    <button type="submit" >登<span style="width:20px;"></span>陆</button>
                </form>
            </div>
        </div>
        <img src="img/bottomLine.png" style="z-index:0;left: 17%;margin-top: 15%;position: relative;"/>
    </div>
</div>
<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/common.js"></script>
</body>
</html>