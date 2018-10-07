package com.datamarketing.service;

import com.datamarketing.entity.Goods;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mafx on 2018/9/18.
 * @author mafx
 */
@Service
public interface GoodsCommService {
    public List<Goods> getGoodsByUserIdService(int userId);
    public List<Goods> getAllGoodsService();
    public List<Goods> getBelongGoodsService(int userId);
    public void addGoodsService(Goods goods);
    public void deleteGoodsService(int goodsId);
    public Goods getGoodsByIdService(int goodsId);
    public void updateGoodsService(int goodsId,Goods goods);
    public List<Goods> searchGoodsByUserIdAndGoodsNameService(int userId,String goodsName);
    public List<Goods> searchAllGoodsService(String goodsName);
    public List<Goods> searchBelongGoodsService(int userId,String goodsName);
}
