import axios from 'axios';

type Friend = {
  username: string;
  uri: string;
};

type FriendsResponse = {
  friends: Friend[];
  uri: string;
};

type FriendDetailResponse = {
  /** Array of friend usernames */
  friends: string[];
  uri: string;
};

type PlaysDetailResponse = {
  /** Array of play ids */
  plays: string[];
  uri: string;
};

type TwilioFriend = {
  name: string;
  friends: number;
  plays: number;
  uri: string;
};

type GetFriendsResponse = {
  friends: TwilioFriend[];
  uri: string;
};

const HOST_URI = 'https://mauvelous-leopard-5257.twil.io';

const getFriends = async (): Promise<GetFriendsResponse> => {
  try {
    const { data } = await axios.get<FriendsResponse>(`${HOST_URI}/friends`);

    const friends = data.friends.slice(0, 5);

    const friendDetailRequests = friends.map(({ username }) =>
      axios
        .get<FriendDetailResponse>(`${HOST_URI}/friend-detail?username=${username}`)
        .then(({ data }) => data)
        .catch(() => ({ friends: [], uri: "that didn't work..." } as FriendDetailResponse))
    );

    const playsDetailRequests = friends.map(({ username }) =>
      axios
        .get<PlaysDetailResponse>(`${HOST_URI}/plays-detail?username=${username}`)
        .then(({ data }) => data)
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
