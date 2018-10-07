package com.datamarketing.dao;

import com.datamarketing.entity.Goods;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by mafx on 2018/9/18.
 * @author mafx
 */
@Repository
public interface GoodsCommDao {
    public List<Goods> getGoodsByUserIdDao(int userId);
    public List<Goods> getAllGoodsDao();
    public List<Goods> getBelongGoodsDao(int userId);
    public void addGoodsDao(Goods goods);
    public void deleteGoodsDao(int goodsId);
    public Goods getGoodsByIdDao(int goodsId);
    public void updateGoodsDao(@Param("goodsId") int goodsId, @Param("goods")Goods goods);
    public List<Goods> searchGoodsByUserIdAndGoodsNameDao(@Param("userId") int userId,@Param("goodsName") String goodsName);
    public List<Goods> searchAllGoodsDao(String goodsName);
    public List<Goods> searchBelongGoodsDao(@Param("userId") int userId,@Param("goodsName") String goodsName);
}
