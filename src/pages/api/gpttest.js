import fs from 'fs';
import {runGPT} from './_gpt';
// const gptModel = 'gpt-4-turbo-2024-04-09'//'gpt-3.5-turbo-0125';
const gptModel = 'gpt-3.5-turbo-0125';

const markdown = `Welcome to 2024! There's a lot happening in the gaming industry, but one thing is certain: games are still on the rise. Today's gaming landscape revolves around collaboration, team play and interaction with players, both asynchronously and synchronously, with AI NPCs or friends, whether co-present or remote. It's evident that social multiplayer is the heartbeat of new gaming experiences, and we're at the forefront of this wave of change.

Over the past 2 months, we've seen a surge in developer adoption. This success is rooted in our strategic initiatives: showcasing innovative integrations, sponsoring hackathons, collaborating with developer influencers, and establishing partnerships with leading distributors like Discord, Bunch, and Crazygames. These efforts have set all aspects of our growth flywheel in motion.

[

![](./images/650fc667404c1b8aec33a2d7d5ba3cd82a63933d.png)

](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F295488ef-a659-435a-a2ab-064705f07941_1123x604.png)

We understand the challenges, the edge cases, and what it takes to excel. We also recognize that the best way to outperform competitors, especially with a lean budget, is by involving the community. Thanks to significant community engagement last month, we introduced many features that have driven both adoption and developer retention.

We've launched new modules like RPCs (Remote Procedure Calls), ResetState, and CustomLobby, which simplifies the development of common multiplayer scenarios into just a few lines of code with edges cases auto handled. [We've released over 10 changelogs within a month](https://joinplayroom.us21.list-manage.com/track/click?u=bd7bb94d52e1859e515b7b5ce&id=25aab39975&e=433c210fd2).

[

![](./images/3fa03d230d5fb8fa00350c06b88ce276ecc53507.gif)

](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6caa9975-ad63-44da-8100-02488cef909f_800x935.gif)

We've noticed a surge in interest for TikTok games, which led us to meet with TikTok's BD team to discuss live multiplayer support. [We've introduced an experimental mode](https://joinplayroom.us21.list-manage.com/track/click?u=bd7bb94d52e1859e515b7b5ce&id=7de12d2a7f&e=433c210fd2) that enables developers to create games interacting with TikTok live chat inputs, impacting gameplay.

[

![](./images/333ae36bdf35358cc35d31a5a9dacdb9b62d76c8.png)

](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07edbc1e-9a0b-4720-bfee-096f1052b9e6_1092x708.png)

It's clear we're doing something right. Playroom is becoming the go-to choice for developers exploring fresh engines, improved workflows, and new platforms. [As mentioned in my 2024 company note](https://joinplayroom.us21.list-manage.com/track/click?u=bd7bb94d52e1859e515b7b5ce&id=e0eb6a05b0&e=433c210fd2), we're not just addressing old problems in the gaming industry; we're creating a cutting-edge and accessible multiplayer platform for the future.

Unconventional ways sparks innovation.

We anticipate monthly developer adoption to rise with the launch of new multiplayer integrations, including VR, ReadyPlayerMe, Inworld, Tiktok, and Twitch. Stay tuned for more on this.

[

![](./images/be13359d879db76a0d1da1d758411e76668a7283.png)

](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fccb514a9-ad2f-4db8-8256-348f0a43b0dd_1081x683.png)

In just last 2 months, we're now finally seeing games handling 100k players a month, and most of them are from the US, with a strong showing from the MENA region too. This demographic spread hints at the potential for global expansion in our go-to-market strategy.

[

![](./images/495b5f4570e503863f561aa361d58d164e88c3c2.png)

](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe88476e7-7944-4fdb-ad31-53997b3944d0_2836x1755.png)

We're observing a trend where developers creatively building new modules using Playroom and sharing them on our Discord. We're talking about everything from [Unity network layers](https://joinplayroom.us21.list-manage.com/track/click?u=bd7bb94d52e1859e515b7b5ce&id=2fecd2349c&e=433c210fd2), Godot templates, Inworld integrations, [RPM Avatar templates](https://joinplayroom.us21.list-manage.com/track/click?u=bd7bb94d52e1859e515b7b5ce&id=57920f367f&e=433c210fd2) to [easy-install](https://joinplayroom.us21.list-manage.com/track/click?u=bd7bb94d52e1859e515b7b5ce&id=c72cc5f5a9&e=433c210fd2) packages.

This is opening up new doors for us, possibly even a marketplace for paid multiplayer templates and modules for all engines. Think of it as Canva, but for multiplayer games.

[

![](./images/0af0606285abc6da842bb7e9b1c39966c7ef5e0c.jpeg)

](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6fd2e1b4-9203-44f7-8770-63d3beaf3c11_1705x957.jpeg)

**There is more:**

*   [Developer building Mario Kart](https://joinplayroom.us21.list-manage.com/track/click?u=bd7bb94d52e1859e515b7b5ce&id=45aa3522fd&e=433c210fd2) clone using Playroom.
    
*   [Playroom multiplayer tutorials](https://joinplayroom.us21.list-manage.com/track/click?u=bd7bb94d52e1859e515b7b5ce&id=b9f56348b3&e=433c210fd2) by Wawasensei
    
*   Playroom sponsored [Boss Rush Jam](https://joinplayroom.us21.list-manage.com/track/click?u=bd7bb94d52e1859e515b7b5ce&id=015db657d1&e=433c210fd2) - 3500+ devs
    
*   Playroom sponsored [Pixel Game Jam](https://joinplayroom.us21.list-manage.com/track/click?u=bd7bb94d52e1859e515b7b5ce&id=3e027eb533&e=433c210fd2) - 2500+ devs
    

### Subscribe to Playroom Updates

What's latest on Playroom Games`;
const instructions = `
Remove all links that wrap the img tags:

[

![img]()

](some link)

remove all these please BOTH brackets and the link inside

BUT keep the image embeds!

Add the following header (replace curly with actual data):
\`\`\`
---
title: "{TITLE_HERE}"
image: "{LINK_TO_FIRST_IMAGE_FROM_ARTICLE}"
---

import AuthorBio from "../../components/AuthorBio";

# {TITLE_HERE}

<AuthorBio author="tabish" date="Feb 01, 2024" />

\`\`\`
`

const instructions2 = `
Add the following header (replace curly with actual data):
\`\`\`
---
title: "{TITLE_HERE}"
image: "{LINK_TO_FIRST_IMAGE_FROM_ARTICLE}"
---

import AuthorBio from "../../components/AuthorBio";

# {TITLE_HERE}

<AuthorBio author="tabish" date="Feb 01, 2024" />

\`\`\`
`

export default async function handler(req, res) {
  const out = await runGPT(gptModel, markdown, instructions2);
  res.status(200).json(out);
  // res.status(200).send(out.content);
}