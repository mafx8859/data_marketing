package com.datamarketing.service.serviceImpl;

import com.datamarketing.dao.GoodsCommDao;
import com.datamarketing.entity.Goods;
import com.datamarketing.service.GoodsCommService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mafx on 2018/9/18.
 * @author mafx
 */
@Service
public class GoodsCommServiceImpl implements GoodsCommService {
    @Autowired
    GoodsCommDao goodsCommDao;

    @Override
    public List<Goods> getGoodsByUserIdService(int userId) {
        List<Goods> goodsList=goodsCommDao.getGoodsByUserIdDao(userId);
        return goodsList;
    }

    @Override
    public List<Goods> getAllGoodsService() {
        return goodsCommDao.getAllGoodsDao();
    }

    @Override
    public List<Goods> getBelongGoodsService(int userId) {
        return goodsCommDao.getBelongGoodsDao(userId);
    }

    @Override
    public void addGoodsService(Goods goods) {
        goodsCommDao.addGoodsDao(goods);
    }

    @Override
    public void deleteGoodsService(int goodsId) {
        goodsCommDao.deleteGoodsDao(goodsId);
    }

    @Override
    public Goods getGoodsByIdService(int goodsId) {
        return goodsCommDao.getGoodsByIdDao(goodsId);
    }

    @Override
    public void updateGoodsService(int goodsId,Goods goods) {
        goodsCommDao.updateGoodsDao(goodsId,goods);
    }

    @Override
    public List<Goods> searchGoodsByUserIdAndGoodsNameService(int userId, String goodsName) {
        return goodsCommDao.searchGoodsByUserIdAndGoodsNameDao(userId,goodsName);
    }

    @Override
    public List<Goods> searchAllGoodsService(String goodsName) {
        return goodsCommDao.searchAllGoodsDao(goodsName);
    }

    @Override
    public List<Goods> searchBelongGoodsService(int userId, String goodsName) {
        return goodsCommDao.searchBelongGoodsDao(userId,goodsName);
    }
}
