import Tweet from './Tweet';

export default function App() {
  return (
    <div className="tweet-list">
      <Tweet
        profileImage="https://xsgames.co/randomusers/avatar.php?g=male"
        name="John Doe"
        handle="johndoe"
        date="Dec 25"
        message="I got my wife a fridge for Christmas. I can't wait to see her face light up when she opens it."
        replyCount="1,094"
        retweetCount="512"
        likeCount="512"
      />
      <Tweet
        profileImage="https://xsgames.co/randomusers/avatar.php?g=female"
        name="Jane Doe"
        handle="janedoe"
        date="Oct 24"
        message="I told my husband that he has no sense of direction at all. He got so mad that he packed up his stuff and right."
        replyCount="193"
        retweetCount="3,960"
        likeCount="40.5 K"
      />
      <Tweet
        profileImage="https://xsgames.co/randomusers/avatar.php?g=pixel"
        name="WALL-E"
        handle="walle"
        date="Jul 1"
        message="The best way to predict the future is to invent it."
        replyCount="193"
        retweetCount="3,960"
        likeCount="40.5 K"
      />
    </div>
  );
}
