package com.datamarketing.service;

import com.datamarketing.entity.GoodsMarketData;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mafx on 2018/9/18.
 * @author mafx
 */
@Service
public interface MarketDataCommService {
    public void addMarketDataService(GoodsMarketData goodsMarketData);
    public List<GoodsMarketData> getMarketDataByIdService(int userId);
    public List<GoodsMarketData> getAllMarketDataService();
    public List<GoodsMarketData> getMarketDataByAdminIdService(int userId);
    public void deleteMarketDataByIdService(int dataId);
    public GoodsMarketData getMarketDataByDataIdService(int dataId);
    public void updateMarketDataByIdService(int dataId,GoodsMarketData goodsMarketData);
    public List<GoodsMarketData> searchMarketDataByProvinceIdService(int provinceId);
    public List<GoodsMarketData> getMarketDataByDateAndUserIdService(String startDate,String endDate,int userId,String goodsName);
    public List<GoodsMarketData> getMarketDataByDateAndAdminIdService(String startDate,String endDate,int userId,String goodsName);
    public List<GoodsMarketData> searchMarketDataByDateService(String startDate,String endDate,String goodsName);
    public List<Object> getUserMarketDataAnalysisService(String startDate,String endDate,int preRank,int provinceId,int userId);
    public List<Object> getAdminedUserDataAnalysisService(String startDate,String endDate,int preRank,int provinceId,int userId);
}
