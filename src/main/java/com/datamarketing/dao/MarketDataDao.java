package com.datamarketing.dao;

import com.datamarketing.entity.GoodsMarketData;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by mafx on 2018/9/18.
 * @author mafx
 */
@Repository
public interface MarketDataDao {
    public void addMarketDataDao(GoodsMarketData goodsMarketData);
    public List<GoodsMarketData> getMarketDataByIdDao(int userId);
    public List<GoodsMarketData> getAllMarketDataDao();
    public List<GoodsMarketData> getMarketDataByAdminIdDao(int userId);
    public void deleteMarketDataByIdDao(int dataId);
    public GoodsMarketData getMarketDataByDataIdDao(int dataId);
    public void updateMarketDataByIdDao(@Param("dataId") int dataId, @Param("goodsMarketData") GoodsMarketData goodsMarketData);
    public List<GoodsMarketData> searchMarketDataByProvinceIdDao(int provinceId);
    public List<GoodsMarketData> searchMarketDataByDate(@Param("startDate")String startDate,@Param("endDate")String endDate,@Param("goodsName") String goodsName);
    public List<GoodsMarketData> getMarketDataByDateAndUserIdDao(@Param("startDate")String startDate, @Param("endDate")String endDate, @Param("userId")int userId,@Param("goodsName")String goodsName);
    public List<GoodsMarketData> getMarketDataByDateAndAdminIdDao(@Param("startDate")String startDate,@Param("endDate")String endDate,@Param("userId")int userId,@Param("goodsName")String goodsName);
    public List<Object> getUserMarketDataAnalysisDao(@Param("startDate") String startDate,@Param("endDate")String endDate,@Param("provinceId")int provinceId,@Param("userId") int userId);
    public List<Object> getAdminedUserDataAnalysisDao(@Param("startDate") String startDate,@Param("endDate")String endDate,@Param("provinceId")int provinceId,@Param("userId") int userId);
}
