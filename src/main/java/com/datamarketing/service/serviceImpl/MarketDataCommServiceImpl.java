package com.datamarketing.service.serviceImpl;

import com.datamarketing.dao.MarketDataDao;
import com.datamarketing.entity.DataAnalysisResult;
import com.datamarketing.entity.GoodsMarketData;
import com.datamarketing.service.MarketDataCommService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by mafx on 2018/9/18.
 * @author mafx
 */
@Service
public class MarketDataCommServiceImpl implements MarketDataCommService{
    @Autowired
    MarketDataDao marketDataDao;

    @Override
    public void addMarketDataService(GoodsMarketData goodsMarketData) {
        marketDataDao.addMarketDataDao(goodsMarketData);
    }

    @Override
    public List<GoodsMarketData> getMarketDataByIdService(int userId) {

        return marketDataDao.getMarketDataByIdDao(userId);
    }

    @Override
    public List<GoodsMarketData> getAllMarketDataService() {
        return marketDataDao.getAllMarketDataDao();
    }

    @Override
    public List<GoodsMarketData> getMarketDataByAdminIdService(int userId) {
        return marketDataDao.getMarketDataByAdminIdDao(userId);
    }

    @Override
    public void deleteMarketDataByIdService(int dataId) {
        marketDataDao.deleteMarketDataByIdDao(dataId);
    }

    @Override
    public GoodsMarketData getMarketDataByDataIdService(int dataId) {
        return marketDataDao.getMarketDataByDataIdDao(dataId);
    }

    @Override
    public void updateMarketDataByIdService(int dataId, GoodsMarketData goodsMarketData) {
        marketDataDao.updateMarketDataByIdDao(dataId,goodsMarketData);
    }

    @Override
    public List<GoodsMarketData> searchMarketDataByProvinceIdService(int provinceId) {
        return marketDataDao.searchMarketDataByProvinceIdDao(provinceId);
    }

    @Override
    public List<GoodsMarketData> getMarketDataByDateAndUserIdService(String startDate, String endDate, int userId,String goodsName) {
        return marketDataDao.getMarketDataByDateAndUserIdDao(startDate, endDate, userId,goodsName);
    }

    @Override
    public List<GoodsMarketData> getMarketDataByDateAndAdminIdService(String startDate, String endDate, int userId,String goodsName) {
        return marketDataDao.getMarketDataByDateAndAdminIdDao(startDate,endDate,userId,goodsName);
    }

    @Override
    public List<GoodsMarketData> searchMarketDataByDateService(String startDate, String endDate,String goodsName) {
        return marketDataDao.searchMarketDataByDate(startDate,endDate,goodsName);
    }

    @Override
    public List<Object> getUserMarketDataAnalysisService(String startDate, String endDate, int preRank, int provinceId, int userId) {
        List<Object> objectList=marketDataDao.getUserMarketDataAnalysisDao(startDate,endDate,provinceId,userId);
        if(preRank>=objectList.size()) {
            return objectList;
        }else {
            List<Object> temp=new ArrayList<Object>();
            for(int i=0;i<preRank;i++){
                temp.add(objectList.get(i));
            }
            return temp;
        }

    }

    @Override
    public List<Object> getAdminedUserDataAnalysisService(String startDate, String endDate, int preRank, int provinceId, int userId) {
        List<Object> objectList=marketDataDao.getAdminedUserDataAnalysisDao(startDate,endDate,provinceId,userId);
        List<Object> temp=new ArrayList<Object>();
        if(preRank>objectList.size()){
            for(int i=0;i<objectList.size();i++) {
                DataAnalysisResult dataAnalysisResult = (DataAnalysisResult) objectList.get(i);
                dataAnalysisResult.setOrder(i + 1);
                temp.add(dataAnalysisResult);
            }
            return temp;
        }else {
            for(int i=0;i<preRank;i++){
                DataAnalysisResult dataAnalysisResult=(DataAnalysisResult) objectList.get(i);
                dataAnalysisResult.setOrder(i+1);
                temp.add(dataAnalysisResult);
            }
            return temp;
        }
    }
}
