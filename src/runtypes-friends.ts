import axios from 'axios';
import { Number, String, Array, Record, Static } from 'runtypes';

const Friend = Record({
  username: String,
  uri: String,
});
type Friend = Static<typeof Friend>;

const FriendsResponse = Record({
  friends: Array(Friend),
  uri: String,
});
type FriendsResponse = Static<typeof FriendsResponse>;

const FriendDetailResponse = Record({
  /** Array of friend usernames */
  friends: Array(String),
  uri: String,
});
type FriendDetailResponse = Static<typeof FriendDetailResponse>;

const PlaysDetailResponse = Record({
  plays: Array(String),
  uri: String,
});
type PlaysDetailResponse = Static<typeof PlaysDetailResponse>;

const TwilioFriend = Record({
  name: String,
  friends: Number,
  plays: Number,
  uri: String,
});
type TwilioFriend = Static<typeof TwilioFriend>;

const GetFriendsResponse = Record({
  friends: Array(TwilioFriend),
  uri: String,
});
type GetFriendsResponse = Static<typeof GetFriendsResponse>;

const HOST_URI = 'https://mauvelous-leopard-5257.twil.io';

const getFriends = async (): Promise<GetFriendsResponse> => {
  try {
    const friendsResponse = await axios
      .get(`${HOST_URI}/friends`)
      .then(({ data }) => FriendsResponse.check(data));

    const friends = friendsResponse.friends.slice(0, 5);

    const friendDetailRequests = friends.map(({ username }) =>
      axios
        .get(`${HOST_URI}/friend-detail?username=${username}`)
        .then(({ data }) => FriendDetailResponse.check(data))
        .catch((err) => {
          console.error(err);
          return { friends: [], uri: "that didn't work..." } as FriendDetailResponse;
        })
    );

    const playsDetailRequests = friends.map(({ username }) =>
      axios
        .get(`${HOST_URI}/plays-detail?username=${username}`)
        .then(({ data }) => PlaysDetailResponse.check(data))
        .catch(() => ({ plays: [], uri: "that didn't work..." } as PlaysDetailResponse))
    );

    const [friendDetailList, playsDetailList] = await Promise.all([
      Promise.all(friendDetailRequests),
      Promise.all(playsDetailRequests),
    ]);

    const formattedFriends: TwilioFriend[] = friends.map(({ username, uri }, idx) => ({
      name: username,
      friends: friendDetailList[idx].friends.length,
      plays: playsDetailList[idx].plays.length,
      uri,
    }));

    return {
      friends: formattedFriends,
      uri: '/friends',
    };
  } catch (err) {
    console.log('err: ', err);

    return {
      friends: [],
      uri: '/friends',
    };
  }
};

getFriends().then(console.log);
