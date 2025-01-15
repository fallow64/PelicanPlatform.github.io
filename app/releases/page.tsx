import React from 'react';
import {
  Box,
  Container,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { GitHubReleaseData } from '@/utils/github';
import { organizeReleases } from '@/utils/releases';
import MarkdownContainer from '@/components/MarkdownContainer';

const Page = async () => {
  const organizedReleases = await organizeReleases();

  return (
    <Container maxWidth='md'>
      <Box pt={6} pb={4}>
        <Typography variant='h2' component='h1'>
          Pelican Releases
        </Typography>
        <Divider
          sx={{
            bgcolor: 'primary.main',
            height: '0.25rem',
          }}
        />
      </Box>
      {Object.keys(organizedReleases).map((mainRelease, index) => {
        return (
          <Box key={index} pb={4}>
            <Typography variant='h3' component='h2'>
              {mainRelease[0].toUpperCase() + mainRelease.slice(1)}
            </Typography>
            {organizedReleases[mainRelease].mainRelease.body !== '' ? (
              <Box pb={4}>
                <MarkdownContainer
                  content={organizedReleases[mainRelease].mainRelease.body}
                />
              </Box>
            ) : null}
            {organizedReleases[mainRelease].minorReleases.map(
              (release: GitHubReleaseData) => (
                <Accordion key={release.tag_name}>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls={`${release.tag_name}-content`}
                    id={`${release.tag_name}-header`}
                  >
                    <Typography variant='h5' component='h2'>
                      {release.tag_name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <MarkdownContainer content={release.body} />
                  </AccordionDetails>
                </Accordion>
              )
            )}
          </Box>
        );
      })}
    </Container>
  );
};

export default Page;
