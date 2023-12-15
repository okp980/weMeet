import {View, Text, SectionList, FlatList} from 'react-native';
import React from 'react';
import {CustomText, Layout, MatchCard} from '../../components';
import {matches} from '../../helpers/data';

type Props = {};

const Title = ({title}: {title: string}) => (
  <View className="flex-row items-center py-1 bg-white">
    <View className="h-[1px] flex-1 bg-[#E8E6EA]" />
    <View className="flex-1 items-center">
      <CustomText as="small">{title}</CustomText>
    </View>
    <View className="h-[1px] flex-1 bg-[#E8E6EA]" />
  </View>
);

const RenderSection = ({data}: {data: any}) => {
  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({item}) => <MatchCard match={item} />}
      keyExtractor={(item, index) => item.name + index}
      showsVerticalScrollIndicator={false}
    />
  );
};

const Match = (props: Props) => {
  return (
    <Layout>
      <CustomText as="regular">
        This is a list of people who have liked you and your matches.
      </CustomText>
      <SectionList
        className="mt-8"
        sections={matches}
        keyExtractor={(item, index) => item.name + index}
        renderSectionHeader={({section: {title}}) => <Title title={title} />}
        renderItem={({section: {data}}) => <RenderSection data={data} />}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

export default Match;
