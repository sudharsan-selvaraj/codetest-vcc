const CampaignPage = require('../../pages/campaign');
const data = require("./../../app-data.json");

describe('Volvo campaign page', () => {

    describe("Intro video section", function () {

        beforeAll(async function () {
            await CampaignPage.open();
            await browser.pause(2000);
        });

        it("should play the correct user story video", async function () {
            expect(await CampaignPage.IntroVideoSection.getVideoSource()).toEqual(data.campaignPage.userStoryVideoUrlSmall);
        });

    });

});

