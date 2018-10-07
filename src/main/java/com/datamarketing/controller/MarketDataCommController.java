package com.datamarketing.controller;

import com.datamarketing.entity.GoodsMarketData;
import com.datamarketing.entity.User;
import com.datamarketing.service.MarketDataCommService;
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
public class MarketDataCommController {
    @Autowired
    MarketDataCommService marketDataCommService;

    @RequestMapping(value = "/marketData/addMarketData",method = RequestMethod.GET)
    @ResponseBody
    public String addMarketData(HttpServletRequest request,GoodsMarketData goodsMarketData){
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
        goodsMarketData.setUser_id(userId);
        marketDataCommService.addMarketDataService(goodsMarketData);
        return "{\"status\":1}";
    }

    @RequestMapping(value = "/marketData/getMarketData",method = RequestMethod.GET)
    @ResponseBody
    public List<GoodsMarketData> getMarketData(HttpServletRequest request){
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
        List<GoodsMarketData> goodsMarketDataList=null;
        //普通用户
        if(user.getLevel()==0) {
            goodsMarketDataList=marketDataCommService.getMarketDataByIdService(userId);
            return goodsMarketDataList;
        }
        //管理员
        else if(user.getLevel()==1){
            goodsMarketDataList=marketDataCommService.getMarketDataByAdminIdService(userId);
            return goodsMarketDataList;
        }
        //超级管理员可查看所有数据
        else if(user.getLevel()==2){
            goodsMarketDataList=marketDataCommService.getAllMarketDataService();
            return goodsMarketDataList;

        }else {
            return goodsMarketDataList;
        }
    }

    @RequestMapping(value = "/marketData/deleteMarketData",method = RequestMethod.GET)
    @ResponseBody
    public String deleteMarketDataById(@RequestParam("dataId") int dataId){
        marketDataCommService.deleteMarketDataByIdService(dataId);
        return "{\"status\":1}";
    }

    @RequestMapping(value = "/marketData/getMarketDataById",method = RequestMethod.GET)
    @ResponseBody
    public GoodsMarketData getMarketDataById(@RequestParam("dataId")int dataId){
        return marketDataCommService.getMarketDataByDataIdService(dataId);
    }

    @RequestMapping(value = "/marketData/updateMarketData",method = RequestMethod.GET)
    @ResponseBody
    public String updateMarketDataById(@RequestParam("dataId") int dataId,GoodsMarketData goodsMarketData){
        marketDataCommService.updateMarketDataByIdService(dataId,goodsMarketData);
        return "{\"status\":1}";
    }

    @RequestMapping(value = "/marketData/searchMarketDataByProvinceId",method = RequestMethod.GET)
    @ResponseBody
    public List<GoodsMarketData> searchMarketDataByProvinceId(@RequestParam("provinceId") int provinceId){
        return marketDataCommService.searchMarketDataByProvinceIdService(provinceId);
    }
    @RequestMapping(value = "/marketData/searchMarketDataByDate",method = RequestMethod.GET)
    @ResponseBody
    public List<GoodsMarketData> searchMarketDataByDate(HttpServletRequest request,@RequestParam("startDate")String startDate,@RequestParam("endDate")String endDate,@RequestParam("goodsName")String goodsName){
        startDate=startDate.replaceAll("/","-");
        endDate=endDate.replaceAll("/","-");
        System.out.print(startDate);
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
        List<GoodsMarketData> goodsMarketDataList=null;
        //System.out.println(user.getLevel());
        if(user.getLevel()==0){
            //System.out.println(userId);
            return marketDataCommService.getMarketDataByDateAndUserIdService(startDate,endDate,userId,goodsName);

        }else if(user.getLevel()==1){
            return marketDataCommService.getMarketDataByDateAndAdminIdService(startDate,endDate,userId,goodsName);
        }else if(user.getLevel()==2){
            return marketDataCommService.searchMarketDataByDateService(startDate,endDate,goodsName);
        }else {
            return goodsMarketDataList;
        }
    }

    @RequestMapping(value = "/marketData/dataAnalysis",method = RequestMethod.GET)
    @ResponseBody
    public List<Object> dataAnalysis(HttpServletRequest request,@RequestParam("startDate")String startDate,@RequestParam("endDate")String endDate,@RequestParam("preRank") int preRank,@RequestParam("provinceId") int provinceId){
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
        if(user.getLevel()==0){
            return marketDataCommService.getUserMarketDataAnalysisService(startDate,endDate,preRank,provinceId,userId);
        }else if(user.getLevel()==1){
            return marketDataCommService.getAdminedUserDataAnalysisService(startDate,endDate,preRank,provinceId,userId);
        }else {
            return marketDataCommService.getAdminedUserDataAnalysisService(startDate,endDate,preRank,provinceId,userId);
        }
    }


}
