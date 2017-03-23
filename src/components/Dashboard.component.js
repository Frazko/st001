import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';



const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 650,
        overflowY: 'auto',
    },
};



const tilesData = [
    {
        img: 'images/dashboard/myCollections.png',
        title: 'My Collections',
        author: 'Frazko',
        featured: true,
    },
    {
        img: 'images/dashboard/messages.png',
        title: 'Messages',
        author: 'Frazko',
    },
    {
        img: 'images/dashboard/friends.png',
        title: 'Friends',
        author: 'Frazko',
    },
    {
        img: 'images/dashboard/newCollections.png',
        title: 'New Collections',
        author: 'Frazko',
        featured: true,
    },
];

/**
 * This example demonstrates "featured" tiles, using the `rows` and `cols` props to adjust the size of the tile.
 * The tiles have a customised title, positioned at the top and with a custom gradient `titleBackground`.
 */
const DashboardComponent = () => (
    <div style={styles.root}>
        <GridList
            cols={2}
            cellHeight={200}
            padding={1}
            style={styles.gridList}
        >
            {tilesData.map((tile) => (
                <GridTile
                    key={tile.img}
                    cols={tile.featured ? 2 : 1}
                    rows={tile.featured ? 2 : 1}
                >
                    <img src={tile.img} />
                </GridTile>
            ))}
        </GridList>
    </div>
);

export default DashboardComponent;