import {
  View,
  Text,
  SectionList,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {CustomText, Layout, MatchCard} from '../../components';
import {useGetMeetRequestsQuery} from '../../services/modules/meet-request';
import {getMatchData} from '../../helpers/utils';
import {useNotification} from '../../hooks';

type Props = {};

const Title = ({title}: {title: string}) => (
  <View className="flex-row items-center py-1 bg-white">
    <View className="h-[1px] flex-1 bg-[#E8E6EA]" />
    <View className="flex-1 items-center">
      <CustomText as="small" className="capitalize">
        {title}
      </CustomText>
    </View>
    <View className="h-[1px] flex-1 bg-[#E8E6EA]" />
  </View>
);

const RenderSection = ({data}: {data: any}) => {
  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({item}) => <MatchCard {...item} />}
      keyExtractor={(item, index) => item.name + index}
      showsVerticalScrollIndicator={false}
    />
  );
};

const Match = (props: Props) => {
  const {changeHasMatchRequest} = useNotification();
  const {
    data: matches,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMeetRequestsQuery({status: 'pending'});

  useEffect(() => {
    changeHasMatchRequest(false);
  }, []);

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  if (isError)
    return (
      <View className="flex-1 justify-center items-center">
        <CustomText as="regular" className="bg-red-500 p-7" color="white">
          {/* @ts-ignore */}
          {error?.data?.message ?? 'Error Fetching Data'}
        </CustomText>
      </View>
    );
  if (matches?.length === 0 && isSuccess) {
    return (
      <View className="flex-1 justify-center items-center">
        <CustomText as="regular">No Likes yet</CustomText>
      </View>
    );
  }
  return (
    <Layout>
      <CustomText as="regular">
        This is a list of people who have liked you and your matches.
      </CustomText>
      <SectionList
        className="mt-8"
        sections={getMatchData(matches!)}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={({section: {title}}) => <Title title={title} />}
        renderItem={({section: {data}}) => <RenderSection data={data} />}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

export default Match;
