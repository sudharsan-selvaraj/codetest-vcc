const CampaignPage = require('../../pages/campaign');
const {click, getCurrentUrl} = require('../../utils/interactions.utils');

const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Volvo campaign page', () => {

    describe("Intro video section", function () {

        beforeAll(async function () {
            await CampaignPage.open();
            await browser.pause(2000);
        });

        it("should play automatically", async function () {
            let initialTime = await CampaignPage.IntroVideoSection.getCurrentTime();
            await browser.pause(2000);
            let currentTime = await CampaignPage.IntroVideoSection.getCurrentTime();
            expect(currentTime > initialTime)
                .toBeTruthy(`Video is not playing. initialTime=${initialTime} and current time=${currentTime}`);
        });

        it(`should display "Watch the story" button`, async function () {
            expect(await CampaignPage.IntroVideoSection.isWatchStoryButtonPresent())
                .toBeTruthy(`"Watch story" button is not displayed`);
        });

        it(`should display the youtube player on clicking "Watch the story" button`, async function () {
            await CampaignPage.IntroVideoSection.clickWatchStory();

            expect(await CampaignPage.IntroVideoSection.checkYoutubePlayerDisplayed())
                .toBeTruthy("Embeded youtube player not displayed")

            expect(await CampaignPage.IntroVideoSection.getYoutubeVideoUrl()).toEqual(browser.data.userStoryYoutubeVideoUrl)
        });

    });

    describe("Callouts section", function () {

        describe("Learn more about car safety link", function () {
            beforeAll(async function () {
                await CampaignPage.open();
                await browser.pause(2000);
            });

            it("should be displayed", async function () {
                expect(CampaignPage.CalloutsSection.isLearnAboutCarSafetyDisplayed())
                    .toBeTruthy(`"Learn more about car safety" link is not displayed`);
            });

            it("should have default color as #1c6bba", async function () {
                expect(await CampaignPage.CalloutsSection.getLearnAboutCarLinkColor()).toEqual("#1c6bba");
            });

            it(`should change the color to #141414 on mouse hover`, async function () {
                expect(await CampaignPage.CalloutsSection.getLearnAboutCarLinkColor(true)).toEqual("#141414");
            });

            it(`should navigate to "/car-safety" page on clicking`, async function () {
                await click(CampaignPage.CalloutsSection.learnAboutCarsElement);
                expect(await getCurrentUrl()).toContain("/car-safety");
            });
        });

    });

});


