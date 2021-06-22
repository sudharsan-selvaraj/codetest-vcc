const CampaignPage = require('../../pageobjects/campaign.page');
const {click, getCurrentUrl} = require('../../utils/interactions.utils');

describe('Volvo campaign page ', () => {

    describe("Intro video section", function () {

        beforeAll(async function () {
            await CampaignPage.open();
            await browser.pause(2000);
        });

        it("should play automatically", async function () {
            let initialTime = await CampaignPage.userVideoSection.getCurrentTime();
            await browser.pause(2000);
            let currentTime = await CampaignPage.userVideoSection.getCurrentTime();
            expect(currentTime > initialTime)
                .toBeTruthy(`Video is not playing. initialTime=${initialTime} and current time=${currentTime}`);
        });

        it("should play the correct user story video", async function () {
            expect(await CampaignPage.userVideoSection.getVideoSource()).toEqual(browser.data.userStoryVideoUrl);
        });

        it(`should display "Watch the story" button`, async function () {
            expect(await CampaignPage.userVideoSection.isWatchStoryButtonPresent())
                .toBeTruthy(`"Watch story" button is not displayed`);
        });

        it(`should display the youtube player on clicking "Watch the story" button`, async function () {
            await CampaignPage.userVideoSection.clickWatchStory();

            expect(await CampaignPage.userVideoSection.checkYoutubePlayerDisplayed())
                .toBeTruthy("Embeded youtube player not displayed")

            expect(await CampaignPage.userVideoSection.getYoutubeVideoUrl()).toEqual(browser.data.userStoryYoutubeVideoUrl)
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


