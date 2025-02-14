import axios from 'axios';
import { NextResponse } from 'next/server';

// Function to fetch the image from Instagram
async function fetchInstagramImage(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
            responseType: 'arraybuffer', // Get raw image data
            timeout: 5000, // Set a timeout
        });

        return response;
    } catch (error) {
        console.error('Error fetching Instagram image:', error.message);
        throw error;
    }
}

// GET request handler for fetching Instagram images
export async function GET(req) {
    try {
        const imageUrl = req.nextUrl.searchParams.get('url');

        if (!imageUrl) {
            return NextResponse.json({ error: 'Image URL is required.' }, { status: 400 });
        }

        // Fetch the image from Instagram
        const { data, headers } = await fetchInstagramImage(imageUrl);

        // Set content-type dynamically
        const contentType = headers['content-type'] || 'image/webp';

        return new NextResponse(data, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable', // Optional caching
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching the image from Instagram.' }, { status: 500 });
    }
}

// Function to extract Instagram shortcode from URL
function extractShortcode(link) {
    const regex = /\/(reel|p|stories)\/([^/?]+)/;
    const match = link.match(regex);
    return match ? match[2] : null;
}

// POST request handler for fetching Instagram media details
export async function POST(request) {
    try {
        const { link } = await request.json();
        
        if (!link) {
            return NextResponse.json({ error: 'Instagram link is required' }, { status: 400 });
        }

        const shortcode = extractShortcode(link);
        
        if (!shortcode) {
            return NextResponse.json({ error: 'Invalid Instagram link' }, { status: 400 });
        }

        const url = "https://www.instagram.com/graphql/query";
        
        const headers = {
            "content-type": "application/x-www-form-urlencoded",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
        };

        const payload = {
            variables: JSON.stringify({
                shortcode: shortcode,
                fetch_tagged_user_count: null,
                hoisted_comment_id: null,
                hoisted_reply_id: null
            }),
            doc_id: "8845758582119845"
        };

        const response = await axios.post(url, payload, { headers });
        const data = response.data;

        const xdt_shortcode_media = data.data.xdt_shortcode_media;
        
        // Check for carousel (multiple images)
        const isCarousel = xdt_shortcode_media.edge_sidecar_to_children ? true : false;
        const carouselCount = isCarousel ? xdt_shortcode_media.edge_sidecar_to_children.edges.length : 0;

        // Get details for video or image
        const video_url = xdt_shortcode_media.video_url || null;
        const username = xdt_shortcode_media.owner?.username || null;
        const profile_picture = xdt_shortcode_media.owner?.profile_pic_url || null;
        const display_url = xdt_shortcode_media.display_url || null;
        const video_count = xdt_shortcode_media.video_view_count || 0;
        const isVideo = xdt_shortcode_media.is_video;

        if (isCarousel) {
            // Fetch carousel images if available
            const carouselUrls = xdt_shortcode_media.edge_sidecar_to_children.edges.map(item => item.node.display_url);
            return NextResponse.json({ video_url, username, profile_picture, display_url, video_count, isVideo, isCarousel, carouselUrls, carouselCount }, { status: 200 });
        }

        // Return response for single image or video
        return NextResponse.json({ video_url, username, profile_picture, display_url, video_count, isVideo, isCarousel, carouselCount }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: 'Failed to fetch media details' }, { status: 500 });
    }
}
