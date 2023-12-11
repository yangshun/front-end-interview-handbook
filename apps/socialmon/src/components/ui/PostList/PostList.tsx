'use client';

import { useEffect,useState } from 'react';

import PostItem from './PostItem';
import { type Post } from '../../../models/Post';

import '@mantine/core/styles.css';

import { Box, Title } from '@mantine/core';


export default function PostList() {
    const [unrepliedPosts, setUnrepliedPosts] = useState<Array<Post>>([]);

//   Async function getRelevantPosts() {
//     try {
//       const res = await fetch('/api/platform');
//       const data = await res.json();

//       console.info(data);

//       setUnrepliedPosts([...unrepliedPosts, ...data]);

//       return data;
//     } catch (error) {
//       console.error('Error fetching relevant posts:', error);

//       return [];
//     }
//   }

    async function getUnrepliedPosts() {
        try {
            const res = await fetch('/api/db/unrepliedPosts');
            const data = await res.json();

            console.info(data);

            return data;
        } catch (error) {
            console.error('Error fetching unreplied posts:', error);

            return [];
        }
    }

    async function updatePost(postId: string, response: string | null) {
        const postToEdit = unrepliedPosts.find((post) => post.id === postId);

        if (!postToEdit) {
            // TODO: Handle error
            return;
        }

        const oldResponse = postToEdit.response;

        postToEdit.response = response;

        console.info('Updating post:', postToEdit.title);

        try {
            const res = await fetch('/api/db/posts', {
                body: JSON.stringify(postToEdit),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
            });
            const data = await res.json();

            console.info(data);
        } catch (error) {
            console.error('Error updating post:', error);
            // TODO: Handle error
            postToEdit.response = oldResponse;
        }
    }

    async function replyToPost(postId: string, response: string | null) {
        const postToReplyTo = unrepliedPosts.find((post) => post.id === postId);

        if (!postToReplyTo) {
            // TODO: Handle error
            return;
        }

        const oldResponse = postToReplyTo.response;

        postToReplyTo.response = response;
        postToReplyTo.replied = true;
        postToReplyTo.repliedAt = new Date();

        console.info('Replying to post:', postToReplyTo.title);

        try {
            const res = await fetch('/api/platform', {
                body: JSON.stringify(postToReplyTo),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });

            const data = await res.json();

            console.info(data);
        } catch (error) {
            console.error('Error replying to post:', error);
            // TODO: Handle error
            postToReplyTo.response = oldResponse;
            postToReplyTo.replied = false;
            postToReplyTo.repliedAt = null;
        }
    }

    function sortByPostDate(a: Post, b: Post) {
        return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
    }

    useEffect(() => {
        getUnrepliedPosts().then((posts) => {
            const sortedPosts = posts.sort(sortByPostDate);

            setUnrepliedPosts(sortedPosts);
        });
    }, []);

    return (
        <Box m="lg">
            <Title mb="md" order={2}>Unreplied Posts for [Platform Name]</Title>
            {unrepliedPosts.map((post) => (
            <PostItem key={post.id}
                editResponse={(response: string | null) => updatePost(post.id, response)}
                post={post}
                replyToPost={(response: string | null) => replyToPost(post.id, response)}></PostItem>
            ))}
        </Box>
    );
}
