// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  NextApiRequest,
  NextApiResponse
} from "next";

let leaderboard = [{
    name: "Jane Doe",
    totalPoints: 157,
    clicks: 5
  },
  {
    name: "Lily Allen",
    totalPoints: 234,
    clicks: 8
  },
  {
    name: "John Smith",
    totalPoints: 390,
    clicks: 10
  },
];

const addScoreToLeaderboard = (score) => {
  const indexOfExistingScore = leaderboard.findIndex(
    (el) => el.name === score.name
  );
  if (indexOfExistingScore !== -1) {
    leaderboard[indexOfExistingScore].totalPoints = score.totalPoints;
    leaderboard[indexOfExistingScore].clicks = score.clicks;
  } else {
    leaderboard = [...leaderboard, score];
  }

  leaderboard = leaderboard.sort(
    (a, b) => Number(b.totalPoints) - Number(a.totalPoints)
  );
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    const score = {
      name: body.name,
      totalPoints: body.totalPoints,
      clicks: body.clicks,
    };
    addScoreToLeaderboard(score);
    res.status(200).json({
      status: "ok"
    });
  } else {
    res.status(200).json(leaderboard);
  }
}
