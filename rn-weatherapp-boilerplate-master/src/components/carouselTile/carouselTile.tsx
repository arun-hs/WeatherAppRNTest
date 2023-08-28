import { CarouselTileProps } from "./types";
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';

const CarouselTile = ({
    title,
    country,
    onCarouselTilePress,
}: CarouselTileProps) => {
    return (
        <View>
            {onCarouselTilePress ? (
                <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => onCarouselTilePress()}>
                    <View style={{ flex: 1 }}>
                        <ImageBackground
                            source={require('../../assets/images/tile.png')}
                            style={{ minHeight: 120, minWidth: 150 }}
                            imageStyle={{ borderRadius: 16 }}
                        >
                            <View style={{ height: '100%', width: '100%', justifyContent: "center" }}>
                                <Text
                                    style={{
                                        fontSize: 28,
                                        textAlign: "center",
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        color: 'black',
                                    }}>
                                    {title} {"\n"}
                                    {country}
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            ) : (
                <View />
            )}
        </View>
    );
};

export default CarouselTile;
