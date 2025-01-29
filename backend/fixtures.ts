import mongoose from "mongoose";
import config from "./config";

import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("artists");
        await db.dropCollection("albums");
        await db.dropCollection("tracks");
        await db.dropCollection("users");
    } catch (e) {
        console.log("Collections were not presents")
    }

    const [Martin, Lazlo] = await User.create(
        {
            username: "Martin",
            password: "123",
            role: "admin",
            token: crypto.randomUUID(),
        },
        {
            username: "Lazlo",
            password: "123",
            role: "user",
            token: crypto.randomUUID(),
        }
    );


    const [TheWeeknd, LanaDelRey] = await Artist.create(
        {
            user: Martin._id,
            name: "The Weeknd",
            photo: "fixtures/TheWeeknd.jpg",
            information: "The Weeknd real name is Abel Tesfaye"
        },
        {
            user: Lazlo._id,
            name: "Lana Del Rey",
            photo: "fixtures/LanaDelRey.jpg",
            information: "Lana Del Rey real name is Elizabeth Grant",
            isPublished: true
        },
    )

    const [Starboy, AfterHours, BornToDie, LustForLife] = await Album.create(
        {
            user: Martin._id,
            artist: TheWeeknd._id,
            title: "Starboy",
            year: 2016,
            image: "fixtures/Starboy.png",
        },
        {
            user: Lazlo._id,
            artist: TheWeeknd._id,
            title: "After Hours",
            year: 2020,
            image: "fixtures/AfterHours.png"
        },
        {
            user: Martin._id,
            artist: LanaDelRey._id,
            title: "Born to Die",
            year: 2012,
            image: "fixtures/BornToDie.jpg"
        },
        {
            user: Lazlo._id,
            artist: LanaDelRey._id,
            title: "Lust for Life",
            year: 2017,
            image: "fixtures/LustForLife.jpg"
        }
        )

    await Track.create(
        {
            user: Martin._id,
            album: Starboy._id,
            title: "Starboy",
            duration: "3:50",
            trackNumber: 1,
        },
        {
            user: Martin._id,
            album: Starboy._id,
            title: "Party Monster",
            duration: "4:09",
            trackNumber: 2,
        },
        {
            user: Martin._id,
            album: Starboy._id,
            title: "False Alarm",
            duration: "3:40",
            trackNumber: 3,
        },
        {
            user: Martin._id,
            album: Starboy._id,
            title: "Reminder",
            duration: "3:38",
            trackNumber: 4,
        },
        {
            user: Martin._id,
            album: Starboy._id,
            title: "Rockin`",
            duration: "3:52",
            trackNumber: 5,
        },
        {
            user: Martin._id,
            album: AfterHours._id,
            title: "Alone Again",
            duration: "4:10",
            trackNumber: 1,
        },
        {
            user: Martin._id,
            album: AfterHours._id,
            title: "Too Late",
            duration: "3:59",
            trackNumber: 2,
        },
        {
            user: Martin._id,
            album: AfterHours._id,
            title: "Hardest to Love",
            duration: "3:31",
            trackNumber: 3,
        },
        {
            user: Martin._id,
            album: AfterHours._id,
            title: "Scared to Live",
            duration: "3:11",
            trackNumber: 4,
        },
        {
            user: Martin._id,
            album: AfterHours._id,
            title: "Snowchild",
            duration: "4:07",
            trackNumber: 5,
        },
        {
            user: Lazlo._id,
            album: BornToDie._id,
            title: "Born To Die",
            duration: "4:46",
            trackNumber: 1,
        },
        {
            user: Lazlo._id,
            album: BornToDie._id,
            title: "Off to the Races",
            duration: "5:00",
            trackNumber: 2,
        },
        {
            user: Lazlo._id,
            album: BornToDie._id,
            title: "Blue Jeans",
            duration: "3:30",
            trackNumber: 3,
        },
        {
            user: Lazlo._id,
            album: BornToDie._id,
            title: "Video Games",
            duration: "4:42",
            trackNumber: 4,
        },
        {
            user: Lazlo._id,
            album: BornToDie._id,
            title: "Diet Mountain Dew",
            duration: "3:43",
            trackNumber: 5,
        },
        {
            user: Lazlo._id,
            album: LustForLife._id,
            title: "Love",
            duration: "4:32",
            trackNumber: 1,
        },
        {
            user: Lazlo._id,
            album: LustForLife._id,
            title: "Lust for Life",
            duration: "4:24",
            trackNumber: 2,
        },
        {
            user: Lazlo._id,
            album: LustForLife._id,
            title: "13 Beaches",
            duration: "4:55",
            trackNumber: 3,
        },
        {
            user: Lazlo._id,
            album: LustForLife._id,
            title: "Cherry",
            duration: "3:00",
            trackNumber: 4,
        },
        {
            user: Lazlo._id,
            album: LustForLife._id,
            title: "White Mustang",
            duration: "2:44",
            trackNumber: 5,
        },
    )

    await db.close();

};

run().catch(console.error);