import * as React from 'react';
import { Dimensions, Text, View, Image } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';

const width = Dimensions.get('window').width;
function HomePageCarousel() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const imagesSlide = [
    require('../assets/comece-a-poupar.jpg' ),
    require('../assets/comece-a-poupar-1.jpg'),
    require('../assets/comece-a-poupar-2.jpg'),
    require('../assets/comece-a-poupar-3.jpg'),
  ];
  return (
    <View style={{ flex: 1, height: width / 1.4 }}>
      <Carousel
        ref={ref}
        width={width}
        height={width  / 1.4}
        data={imagesSlide}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Image source={item} style={{width: width}} resizeMode='contain'/>
          </View>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={imagesSlide}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>

  );
}

export default HomePageCarousel;