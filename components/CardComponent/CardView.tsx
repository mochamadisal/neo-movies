import { Card, Rate, message } from 'antd';
import { useRouter } from 'next/router'
import { LikeOutlined, FileOutlined } from '@ant-design/icons';
import { Fragment, useEffect, useState } from 'react';

interface ViewProps {
  id: string
  title: string
  year: number
  rating: number
  imageUrl: string,
  unFavouriteAction: () => void
}

function CardView({
  id,
  title,
  year,
  rating,
  imageUrl,
  unFavouriteAction
}: ViewProps) {
  const [isLike, setLike] = useState(false);
  const [isFavourite, setFavourite] = useState(false);
  const router = useRouter()

  const actionLike = (id:string) => {
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
  
  const actionFavourite = (id:string) => {
    const listFavourite: any[] = JSON.parse(localStorage.getItem('favourite'))
    const index = listFavourite.findIndex( (item: { id: string; }) => item.id == id )
    if (index != -1) {
      setFavourite(false)
      listFavourite.splice(index, 1);
      localStorage.setItem('favourite', JSON.stringify(listFavourite))
      unFavouriteAction()
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
    const listLike = JSON.parse(localStorage.getItem('like'))
    const listFavourite = JSON.parse(localStorage.getItem('favourite'))
    const likeIndex = listLike.findIndex( (item: { id: string; }) => item.id == id );
    const favouriteIndex = listFavourite.findIndex( (item: { id: string; }) => item.id == id );

    if (likeIndex != -1) {
      setLike(true)
    }

    if (favouriteIndex != -1) {
      setFavourite(true)
    }
  }, [])

  return (
    <Fragment>
      <Card 
        id="card"
        onClick={() => { router.push('/movie/'+id) } }
        hoverable
        cover={<img className="cover-img-card" alt={title} src={imageUrl} />}
      >
        <p className="font-18 mb-0p">{title}</p>
        <p className="font-12 mb-0p">{year}</p>
        <Rate disabled defaultValue={rating} />
      </Card>
        <Card
          className="box-card-button"
          actions={[
            <LikeOutlined onClick={() => { actionLike(id) }} className={isLike ? 'active-color':''} key="like" />,
            <FileOutlined onClick={() => { actionFavourite(id) }} className={isFavourite ? 'active-color':''} key="favourite" />,
          ]}
        />
    </Fragment>
  )
}

export default CardView

