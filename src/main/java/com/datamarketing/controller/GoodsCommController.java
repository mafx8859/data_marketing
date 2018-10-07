package com.datamarketing.controller;

import com.datamarketing.entity.Goods;
import com.datamarketing.entity.User;
import com.datamarketing.service.GoodsCommService;
import com.datamarketing.test.EntityFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by mafx on 2018/9/18.
 * @author mafx
 */
@Controller
public class GoodsCommController {
    @Autowired
    GoodsCommService goodsCommService;

    @RequestMapping(value = "/goods/getGoods",method = RequestMethod.GET)
    @ResponseBody
    public List<Goods> getGoods(HttpServletRequest request){
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
        List<Goods> goodsList=null;
        //普通用户
        if(user.getLevel()==0) {
            goodsList = goodsCommService.getGoodsByUserIdService(userId);
            return goodsList;
        }
        //管理员
        else if(user.getLevel()==1){
            goodsList = goodsCommService.getBelongGoodsService(userId);
            return goodsList;
        }
        //超级管理员可查看所有数据
        else if(user.getLevel()==2){
            goodsList = goodsCommService.getAllGoodsService();
            return goodsList;
        }else {
            return goodsList;
        }
    }

    @RequestMapping(value = "/goods/addGoods",method = RequestMethod.GET)
    @ResponseBody
    public String addGoods(HttpServletRequest request,Goods goods){
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
        goods.setUser_id(userId);
        goodsCommService.addGoodsService(goods);
        return "{\"status\":1}";
    }

    @RequestMapping(value = "/goods/deleteGoods",method = RequestMethod.GET)
    @ResponseBody
    public String deleteGoods(@RequestParam("goodsId") int goodsId){
        goodsCommService.deleteGoodsService(goodsId);
        return "{\"status\":1}";
    }

    @RequestMapping(value = "/goods/getGoodsById",method = RequestMethod.GET)
    @ResponseBody
    public Goods getGoodsById(@RequestParam("goodsId") int goodsId){
        return goodsCommService.getGoodsByIdService(goodsId);
    }


    @RequestMapping(value = "/goods/updateGoods",method = RequestMethod.GET)
    @ResponseBody
    public String updateGoods(@RequestParam("goodsId") int goodsId,Goods goods){
        goodsCommService.updateGoodsService(goodsId,goods);
        return "{\"status\":1}";
    }
    @RequestMapping(value = "/goods/search",method = RequestMethod.GET)
    @ResponseBody
    public List<Goods> searchGoods(HttpServletRequest request,@RequestParam("goodsName")String goodsName){
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
        List<Goods> goodsList=null;
        //普通用户
        if(user.getLevel()==0){
             goodsList=goodsCommService.searchGoodsByUserIdAndGoodsNameService(userId,goodsName);
             return goodsList;
        }else if(user.getLevel()==1){
            return goodsCommService.searchBelongGoodsService(userId,goodsName);

        }else if(user.getLevel()==2){
            return goodsCommService.searchAllGoodsService(goodsName);

        }else {
            return goodsList;
        }
    }

    @RequestMapping(value = "/goods/getGoodsByUserId",method = RequestMethod.GET)
    @ResponseBody
    public List<Goods> getGoodsByUserId(HttpServletRequest request) {
        User user = null;
        int userId;
        if (request.getSession().getAttribute("user") != null) {
            user = (User) request.getSession().getAttribute("user");
            userId = (Integer) (request.getSession().getAttribute("userId"));
        }
        //用于测试
        else {
            user = EntityFactory.gerUser();
            userId = user.getId();
        }
        List<Goods> goodsList = null;

        goodsList = goodsCommService.getGoodsByUserIdService(userId);
        return goodsList;
    }
}
