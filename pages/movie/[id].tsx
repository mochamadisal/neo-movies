import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import useTranslation from "next-translate/useTranslation";

import { Layout, Row, Col, Skeleton, Rate, Button, message, Modal } from 'antd';
import { LikeOutlined, FileOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Content } = Layout;


const Detail: NextPage = () => {
  type ItemData = {
    id: string
    title: string
    year: number
    rating: number
    imageUrl: string
    imageLargeUrl: string
    starring: any[]
    desc: string
    releaseDate: string
    duration: string
    genre: string
  }
  const [getDetailContent, setDetailContent] = useState<ItemData[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLike, setLike] = useState(false);
  const [isFavourite, setFavourite] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter()
  const { t } = useTranslation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const actionLike = (id:string, title: string, year: number, rating: number, imageUrl: string) => {
    const listLike: any[] = JSON.parse(localStorage.getItem('like'))
    const index = listLike.findIndex( (item: { id: string; }) => item.id == id )
    if (index != -1) {
      setLike(false)
      listLike.splice(index, 1);
      localStorage.setItem('like', JSON.stringify(listLike))
      message.success('success dislike content');
    } else {
      setLike(true)
      const newObj = {
        id: id,
        title: title,
        year: year,
        rating: rating,
        imageUrl: imageUrl
      }
      listLike.push(newObj);
      localStorage.setItem('like', JSON.stringify(listLike))
      message.success('success like content');
    }
  };
  
  const actionFavourite = (id:string, title: string, year: number, rating: number, imageUrl: string) => {
    const listFavourite: any[] = JSON.parse(localStorage.getItem('favourite'))
    const index = listFavourite.findIndex( (item: { id: string; }) => item.id == id )
    if (index != -1) {
      setFavourite(false)
      listFavourite.splice(index, 1);
      localStorage.setItem('favourite', JSON.stringify(listFavourite))
      message.success('success remove from my favourite');
    } else {
      setFavourite(true)
      const newObj = {
        id: id,
        title: title,
        year: year,
        rating: rating,
        imageUrl: imageUrl
      }
      listFavourite.push(newObj);
      localStorage.setItem('favourite', JSON.stringify(listFavourite))
      message.success('success add to my favourite');
    }
  };

  useEffect(() => {

    if (!localStorage.getItem('like')) {
      const newArr: any[] = []
      localStorage.setItem('like', JSON.stringify(newArr));
    }

    if (!localStorage.getItem('favourite')) {
      const newArr: any[] = []
      localStorage.setItem('favourite', JSON.stringify(newArr));
    }

    setIsLoading(true);
    axios.get('https://private-2fff44-bncfetest.apiary-mock.com/movies/'+router.query.id).then((res) => {
      const resData = res.data.data
      const listLike = JSON.parse(localStorage.getItem('like'))
      const listFavourite = JSON.parse(localStorage.getItem('favourite'))
      const likeIndex = listLike.findIndex( (item: { id: string; }) => item.id == resData.id);
      const favouriteIndex = listFavourite.findIndex( (item: { id: string; }) => item.id == resData.id );

      if (likeIndex != -1) {
        setLike(true)
      }

      if (favouriteIndex != -1) {
        setFavourite(true)
      }
      setDetailContent(resData)
      setIsLoading(false);
    }).catch((err) => {
      message.error(err.response);
      setIsLoading(false);
    })
  }, [])

  const setDataToString = (param: any[] | []) => {
    if (param) {
      return param.toString()
    }
  }

  
  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 24, height: '85vh', overflow: 'scroll' }}>
        <Row gutter={[16, 24]}>
            <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                <h1><ArrowLeftOutlined className="cursor-pointer" onClick={() => { router.push('/') }} /> {t("movie:title")} </h1>
                <p>{t("movie:desc")}</p>
            </Col>
        </Row>
        {!isLoading && <Row gutter={[16, 24]}>
            <Col className="gutter-row" xs={24} sm={24} md={9} lg={9} xl={9}>
              <img className="cursor-pointer" onClick={() => { showModal() }} width="400" height="400" alt={getDetailContent.title} src={getDetailContent.imageUrl} />
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={15} lg={15} xl={15}>
                <h1> {getDetailContent.title} </h1>
                <Rate disabled defaultValue={getDetailContent.rating} />
                <p>{t("movie:genre")} : {getDetailContent.genre}</p>
                <p>{t("movie:duration")} : {getDetailContent.duration}</p>
                <p>{t("movie:cast")} : {setDataToString(getDetailContent.starring)}</p>
                <p>{t("movie:release")} : {getDetailContent.releaseDate}</p>
                <p>{getDetailContent.desc}</p>
                <Button size="large" onClick={() => { actionLike(getDetailContent.id, getDetailContent.title, getDetailContent.year, getDetailContent.rating, getDetailContent.imageUrl) }} className={isLike ? 'active-color mr-8p':'mr-8p'} shape="circle" icon={<LikeOutlined />} />
                <Button size="large" onClick={() => { actionFavourite(getDetailContent.id, getDetailContent.title, getDetailContent.year, getDetailContent.rating, getDetailContent.imageUrl) }} shape="circle" className={isFavourite ? 'active-color':''} icon={<FileOutlined />} />
            </Col>
        </Row>}
          {isLoading && <Row gutter={[16, 24]}>
            <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
              <Skeleton className="w-100 skeleton-card" active/>
            </Col>
        </Row>}
      </div>
      <Modal title="Image preview" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
        <img className="full-image" onClick={() => { showModal() }} alt={getDetailContent.title} src={getDetailContent.imageLargeUrl} />
      </Modal>
    </Content>
  )
}

export default Detail
