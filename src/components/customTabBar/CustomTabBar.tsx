import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity} from 'react-native';
import Svg from '../../constants/svg';
import {Navigation} from '../../constants';
import CustomText from '../customText/CustomText';
import {useNotification} from '../../hooks';

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const {hasMatchRequest} = useNotification();
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        let icon;
        switch ((label as string).toLowerCase()) {
          case Navigation.HOME_SCREEN.toLowerCase():
            icon = <Svg.Home fill={isFocused ? '#6657a9' : '#ADAFBB'} />;
            break;
          case Navigation.MATCH_SCREEN.toLowerCase():
            icon = (
              <View>
                <Svg.Heart
                  width={23}
                  fill={isFocused ? '#6657a9' : '#ADAFBB'}
                />
                {hasMatchRequest && (
                  <View className="bg-[#6657a9] h-3 w-3 justify-center items-center rounded-full absolute top-[6px] right-[-4px] border border-[#F3F3F3]" />
                )}
              </View>
            );
            break;
          case Navigation.CHAT_SCREEN.toLowerCase():
            icon = (
              <View>
                <Svg.Message fill={isFocused ? '#6657a9' : '#ADAFBB'} />
                <View className="bg-[#6657a9] h-4 w-4 justify-center items-center rounded-full absolute top-[-4px] right-[-4px] border border-[#F3F3F3]">
                  <CustomText as="tiny" color="white">
                    5
                  </CustomText>
                </View>
              </View>
            );
            break;
          case Navigation.PROFILE_SCREEN.toLowerCase():
            icon = <Svg.Person fill={isFocused ? '#6657a9' : '#ADAFBB'} />;
            break;

          default:
            icon = null;
            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: 70,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F3F3F3',
              position: 'relative',
              borderTopColor: '#E8E6EA',
              borderTopWidth: 1,
            }}
            key={index}>
            {icon}
            <View
              style={{
                height: 2,
                width: '60%',
                backgroundColor: isFocused ? '#6657a9' : 'transparent',
                position: 'absolute',
                top: 0,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
