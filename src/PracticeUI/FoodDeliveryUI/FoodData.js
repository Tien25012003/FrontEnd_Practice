import { Dimensions } from 'react-native';
const { width: WIDTH_SCREEN, height: HEIGHT_SCREEN } = Dimensions.get("screen");
const FOOD_DATA = [
    {
        id: 0,
        name: 'TOMATO SALAD',
        image: require('./assets/salad.png'),
        image_position: {
            //bottom: -HEIGHT_SCREEN * 0.08,
            bottom: 0,
        }
    },
    {
        id: 1,
        name: 'CHEESE SALAD',
        image: require('./assets/salad.png'),
        image_position: {
            //left: -HEIGHT_SCREEN * 0.08,
            left: 0,
            top: HEIGHT_SCREEN * 0.8 * 0.5,
        }
    },
    {
        id: 2,
        name: 'CHICKEN TOMATO',
        image: require('./assets/salad.png'),
        image_position: {
            top: 0,
        }
    },
    {
        id: 3,
        name: 'CEASAR SALAD',
        image: require('./assets/salad.png'),

        image_position: {
            //right: -HEIGHT_SCREEN * 0.08,
            right: 0,
            top: HEIGHT_SCREEN * 0.8 * 0.5,
        }
    },

];
export default FOOD_DATA;