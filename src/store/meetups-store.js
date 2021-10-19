import {writable} from "svelte/store";

const meetups = writable([
    {
        id: "m1",
        title: "Coding Bootcamp",
        subtitle: "Learn to code",
        description: "In this meetup, we will touch You how to code",
        imageUrl: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        address: "35 Nerd Road, 35032 Los Angeles",
        email: "code@test.com",
        isFavorite: false,
    },
    {
        id: "m2",
        title: "Swim Together",
        subtitle: "Learn to swim",
        description: "In this meetup, we will touch You how to swim",
        imageUrl: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        address: "35 Nerd Road, 35032 Los Angeles",
        email: "swim@test.com",
        isFavorite: false,
    },
]);

const customMeetupsStore = {
    subscribe: meetups.subscribe,
    addMeetup: (meetupData) => {
        const newMeetup = {
            ...meetupData,
            id: Math.random().toString(),
            isFavorite: false,
        };
        meetups.update(items => {
            return [newMeetup, ...items];
        });
    },
    toggleFavorite: (id) => {
        meetups.update(items => {
            const updatedMeetup = {...items.find(m => m.id === id)};
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
            const meetupIndex = items.findIndex(m => m.id === id);
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        });
    },
};

export default customMeetupsStore;
