import axios from 'axios'

export const pushDiscordProject = async(pTitle, pDesc, category, subcategory, pm1, pType, pChain, pSocial, pWeb, address, oid) => {
    const discordProjectData = {
        "username": "Servant",
        "avatar_url": 'https://fund.eyeseek.org/bots/servant.jpg',
        "content": "New project was created.",
        "embeds": [
          {
            "author": {
              "name": address,
            },
            "title": pTitle,
            "url": `https://fund.eyeseek.io/project/${oid}`,
            "description": pDesc,
            "color": 15258703,
            "fields": [
                {
                    "name": "Project goal",
                    "value": pm1,
                },
              {
                "name": "Category",
                "value": category,
                "inline": true
              },
              {
                "name": "Subcategory",
                "value": subcategory,
                "inline": true
              },
              {
                "name": "Type",
                "value": pType,
                "inline": true
              },
              {
                "name": "Chain",
                "value": pChain,
                "inline": true
              },
              {
                "name":  "Socials",
                "value": pSocial
              },
              {
                "name":  "Website",
                "value": pWeb
              }
            ]
          }
        ]
      }
    try {
        await axios.post(
        process.env.NEXT_PUBLIC_DISCORD,
        discordProjectData
        );
    } catch (err) {
        console.log(err)
    } 
}

