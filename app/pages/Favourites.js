import { Helmet } from "react-helmet";
import { inject } from 'mobx-react';
import { List, Button, Icon, Row, Col, Empty } from 'antd';
import React, { Component } from 'react';
import styled from 'styled-components';

import PageContent from '../components/PageContent';

const ListRow = styled(Row)`
  width: 100%;
`;

const CategoryListWrapper = styled.div`
  margin-bottom: 30px;
`;

class Favourites extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    const favouritesList = [];

    for (let [entity, favourites] of Object.entries(this.props.sortedFavourites)) {
      favouritesList.push(
        <CategoryListWrapper key={entity}>
          <List
            size="small"
            header={<h2>{entity}</h2>}
            bordered
            dataSource={favourites}
            renderItem={item => <List.Item>
              <ListRow type="flex" justify="space-between" align="middle">
                <Col>
                  {item.entityId} : {item.title}
                </Col>
                <Col>
                  <Button.Group size="default">
                    <Button type="default" onClick={() => this.props.history.push(`/${item.entityType}/update/${item.entityId}`)}>
                      <Icon type="edit" theme="twoTone" twoToneColor="#08415C" />
                      Update
                    </Button>
                    <Button type="default" onClick={() => this.props.remove(item.entityType, item.entityId)}>
                      <Icon type="delete" theme="twoTone" twoToneColor="#A63A50" />
                      Remove from favourites
                    </Button>
                  </Button.Group>
                </Col>
              </ListRow>
            </List.Item>}
          />
        </CategoryListWrapper>
      );
    }

    return (
      <PageContent header="Saved entities">
        <Helmet>
          <title>CAPI Desktop - Favourite Entities</title>
        </Helmet>

        {favouritesList.length > 0 ? favouritesList : <Empty />}
      </PageContent >
    );
  }
}

export default inject(stores => {
  return ({
    load: stores.favouritesStore.load,
    remove: stores.favouritesStore.remove,
    favourites: stores.favouritesStore.favourites,
    sortedFavourites: stores.favouritesStore.sortedFavourites,
  })
})(Favourites);