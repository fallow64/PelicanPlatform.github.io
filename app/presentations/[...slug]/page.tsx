import { Presentation } from "@/components/Presentation"; // Adjust the path as needed
import {getPresentation, getPresentations} from "@/utils/presentations"; // Ensure path is correct
import { Box, Container, Typography } from "@mui/material";

export interface Presentation {
    id: number;
    title: string;
    description: string;
    authors: {
        id: number;
        full_name: string;
        is_active: boolean;
        url_name: string;
        orcid_id: string | null;
    }[];
    figshare_url: string;
    download_disabled: boolean;
    files: {
        id: number;
        name: string;
        size: number;
        is_link_only: boolean;
        download_url: string;
        supplied_md5: string;
        computed_md5: string;
        mimetype: string;
    }[];
    funding: string;
    funding_list: {
        id: number;
        title: string;
        grant_code: string | null;
        funder_name: string | null;
        is_user_defined: number;
        url?: string;
    }[];
    license: {
        value: number;
        name: string;
        url: string;
    };
    tags: string[];
    categories: {
        id: number;
        title: string;
        parent_id: number;
        path: string;
        source_id: string;
        taxonomy_id: number;
    }[];
    citation: string;
    published_date: string;
    thumb: string;
    doi: string;
    status: string;
    defined_type_name: string;
    url_public_html: string;
    created_date: string;
    modified_date: string;
    timeline: {
        posted: string;
        firstOnline: string;
    };
}


async function getPresentationBySlug(slug: string[]): Promise<Presentation | null> {
    try {
        const presentations = await getPresentations();
        const matchedPresentation = presentations.find(
            (presentation) => presentation.slug.join("-") === slug.join("-")
        );

        if (!matchedPresentation) {
            return null;
        }

        return await getPresentation(matchedPresentation.id);
    } catch (error) {
        console.error("Error finding presentation by slug:", error);
        return null;
    }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const presentation = await getPresentationBySlug(params.slug);


    if (!presentation) {
        return (
            <Container>
                <Box textAlign="center" pt={6}>
                    <Typography variant="h3">Presentation Not Found</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Presentation
            id={presentation.id}
            title={presentation.title}
            description={presentation.description}
            authors={presentation.authors.map((author) => author.full_name).join(", ")}
            published_date={presentation.published_date}
            download_url={presentation.files[0].download_url}
            path={presentation.figshare_url}
            thumb={presentation.thumb}
            />
    );
}
