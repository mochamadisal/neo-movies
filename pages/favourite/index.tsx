import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image'

import { Layout, Row, Col, Skeleton } from 'antd';

import Card from '../../components/CardComponent'

const { Content } = Layout;

const Favourite: NextPage = () => {

  type ItemData = {
    id: string
    title: string
    year: number
    rating: number
    imageUrl: string
  }

  const [getContentFavourite, setContentFavourite] = useState<ItemData[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshData = () => {
    setIsLoading(true);
    setContentFavourite(JSON.parse(localStorage.getItem('favourite')))
    setTimeout(function(){ setIsLoading(false); }, 500);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!localStorage.getItem('like')) {
      const newArr: any[] = []
      localStorage.setItem('like', JSON.stringify(newArr));
    }

    if (!localStorage.getItem('favourite')) {
      const newArr: any[] = []
      localStorage.setItem('favourite', JSON.stringify(newArr));
    } else {
      setContentFavourite(JSON.parse(localStorage.getItem('favourite')))
    }

    setIsLoading(false);
  }, [])

  
  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 100 }}>
      <div className="site-layout-background" style={{ padding: 24, height: '80vh', overflow: 'scroll' }}>
        {!isLoading && getContentFavourite.length != 0 && <Row gutter={[16, 24]}>
          {getContentFavourite.map((item, i) => (
            <Col key={i} className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
              <Card id={item.id} title={item.title} year={item.year} rating={item.rating} imageUrl={item.imageUrl} unFavouriteAction={() => { refreshData() }} />
            </Col>
          ))}
        </Row>}
        {!isLoading && getContentFavourite.length == 0 && <Row gutter={[16, 24]}>
          <Col className="gutter-row text-center" xs={24} sm={24} md={24} lg={24} xl={24}>
            <Image src="/nodata.jpg" alt="nodata" width="400" height="400" />
          </Col>
        </Row>}
        {isLoading && <Row gutter={[16, 24]}>
            <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
              <Skeleton className="w-100 skeleton-card" active/>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
              <Skeleton active/>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
              <Skeleton active/>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
              <Skeleton active/>
            </Col>
        </Row>}
      </div>
    </Content>
  )
}

export default Favourite
