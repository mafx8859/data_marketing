package com.datamarketing.controller;

import com.datamarketing.entity.Area;
import com.datamarketing.entity.User;
import com.datamarketing.service.UserCommService;
import com.datamarketing.test.EntityFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by mafx on 2018/9/18.
 * @author mafx
 */
@Controller
public class UserCommController {
    @Autowired
    UserCommService userCommService;

    @RequestMapping(value = "/user/login",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> login(HttpServletRequest request,@RequestParam("username") String username, @RequestParam("password")String password, Model model){
        User user=userCommService.loginService(username,password);
        HttpSession session=request.getSession();
        Map<String,Object> messageMap=new HashMap<String,Object>();
        if(user!=null) {
            session.setAttribute("user",user);
            session.setAttribute("userId",user.getId());
            messageMap.put("status", 1);
        }else{
            messageMap.put("status", 0);
        }
        messageMap.put("user",user);
        return messageMap;

    }

    @RequestMapping(value = "/user/addUser",method = RequestMethod.GET)
    @ResponseBody
    public String addUser(HttpServletRequest request,User user){
        User loginUser=(User)request.getSession().getAttribute("user");
        int province_id=user.getProvince_id();
        userCommService.addUserService(user);
        return "{\"status\":1}";
    }
    @RequestMapping(value = "/user/getUser",method = RequestMethod.GET)
    @ResponseBody
    public List<User> getUser(HttpServletRequest request){
        User user=null;
        int userId;
        if(request.getSession().getAttribute("user")!=null) {
            user = (User) request.getSession().getAttribute("user");
            userId = (Integer) (request.getSession().getAttribute("userId"));
        }
        //用于测试
        else {
            user= EntityFactory.gerUser();
            userId=user.getId();
        }
        List<User> users=null;
        if(user.getLevel()==2){
            users=userCommService.getAllUserService();
            return users;
        }
        if(user.getLevel()==1){
            users=userCommService.getAllUserByAdminIdService(user.getId());
            return users;
        }
        return users;
    }
    @RequestMapping(value = "/user/deleteUserById",method = RequestMethod.GET)
    @ResponseBody
    public String deleteUserById(@RequestParam("userId") int userId){
        userCommService.deleteUserByIdService(userId);
        return "{\"status\":1}";
    }
    @RequestMapping(value = "/user/getUserById",method = RequestMethod.POST)
    @ResponseBody
    public User getUserById(@RequestParam("userId") int userId){
        return userCommService.getUserByIdService(userId);
    }
    @RequestMapping(value = "/area/getArea",method = RequestMethod.GET)
    @ResponseBody
    public List<Area> getArea(HttpServletRequest request){
        return userCommService.getAreaService();
    }

    @RequestMapping(value = "/area/getAdminArea",method = RequestMethod.GET)
    @ResponseBody
    public List<Area> getAdminArea(HttpServletRequest request){
        User user=null;
        int userId;
        if(request.getSession().getAttribute("user")!=null) {
            user = (User) request.getSession().getAttribute("user");
            userId = (Integer) (request.getSession().getAttribute("userId"));
        }
        //用于测试
        else {
            user= EntityFactory.gerUser();
            userId=user.getId();
        }
        return userCommService.getAdminAreaService(userId);
    }

    @RequestMapping(value = "/user/updateUserById",method = RequestMethod.GET)
    @ResponseBody
    public String updateUserById(User user,@RequestParam("userId")int userId){
        userCommService.updateUserByIdService(user,userId);
        return "{\"status\":1}";
    }

    @RequestMapping(value = "/user/creatAdmin",method = RequestMethod.GET)
    @ResponseBody
    public String creatAdmin(@RequestParam("userId")int userId,@RequestParam("adminProvince")int[] provinceIds){
        userCommService.addAdminProvinceService(userId,provinceIds);
        return "{\"status\":1}";
    }
}
