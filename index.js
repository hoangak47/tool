const express = require("express");
const app = express();
const request = require("request-promise");
const cheerio = require("cheerio");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/bocaocongty", async (req, res) => {
  const url = "https://www.bocaocongty.com/moi-thanh-lap?tinhthanh=79&page=16";

  const data = [];
  request(url, async function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      await $("tbody  td:nth-child(2) a").each(function (i, element) {
        const href = $(this).attr("href");
        data.push(href);
      });
    }

    res.send(data);
  });
});

app.get("/infocom", async (req, res) => {
  const href = "https://infocom.vn/thanh-pho-ho-chi-minh/trang-";
  const page = 6000;
  const data = [];

  const fetchData = async (i) => {
    return new Promise((resolve, reject) => {
      const url = href + i;
      request(url, async function (error, response, html) {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          const hrefs = [];
          await $(".title-lg-content-paging a").each(function (i, element) {
            const href = $(this).attr("href");
            hrefs.push(href);
          });
          data.push(...hrefs);
          resolve();
        } else {
          reject(error);
        }
      });
    });
  };

  for (let i = page; i <= page + 5; i++) {
    await fetchData(i);
  }

  res.send(data);
});

const data = [
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-phu-anh-truong-0318114859.html",
  "https://infocom.vn/cong-ty-tnhh-ky-thuat-va-thuong-mai-tong-hop-binh-minh-0318168332.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-stars-tower-0318195456.html",
  "https://infocom.vn/cong-ty-co-phan-dich-thuat-chuyen-nghiep-sen-vang-0314268086.html",
  "https://infocom.vn/cong-ty-tnhh-dau-tu-va-thiet-ke-xay-dung-trong-luc-0318089144.html",
  "https://infocom.vn/cong-ty-tnhh-dich-vu-thuong-mai-xay-dung-phuoc-tan-0317049029.html",
  "https://infocom.vn/cong-ty-tnhh-thiet-bi-y-te-khoa-hoc-ky-thuat-thanh-nghia-0318089923.html",
  "https://infocom.vn/cong-ty-co-phan-salebot-0318093165.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-van-tai-quang-hong-0318093493.html",
  "https://infocom.vn/cong-ty-tnhh-nhien-lieu-thuong-mai-anh-sang-0318093253.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-va-cong-nghe-tensoract-0318094641.html",
  "https://infocom.vn/cong-ty-tnhh-tri-nam-phat-0318317129.html",
  "https://infocom.vn/cong-ty-tnhh-mot-thanh-vien-thi-truong-recess-0311894416.html",
  "https://infocom.vn/cong-ty-tnhh-cg-bio-vietnam-0318177908.html",
  "https://infocom.vn/cong-ty-tnhh-dau-tu-tong-hop-hai-son-0318152082.html",
  "https://infocom.vn/cong-ty-tnhh-hai-san-oc-dem-3-chuan-0318237730.html",
  "https://infocom.vn/cong-ty-co-phan-talaria-0318201318.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-sang-tao-sc-0318210760.html",
  "https://infocom.vn/cong-ty-tnhh-bach-long-logistics-0318129460.html",
  "https://infocom.vn/cong-ty-tnhh-dau-tu-xuat-nhap-khau-quoc-te-toan-thang-0318185698.html",
  "https://infocom.vn/cong-ty-tnhh-lam-thao-cosmetics-0318085848.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-sat-thep-kim-thanh-0318226954.html",
  "https://infocom.vn/cong-ty-tnhh-bls-vina-0314591949.html",
  "https://infocom.vn/cong-ty-tnhh-beijing-meckey-engineering-0318220783.html",
  "https://infocom.vn/cong-ty-tnhh-phat-trien-bat-dong-san-lucky-land-0316674598.html",
  "https://infocom.vn/cong-ty-tnhh-dien-nga-0318375554.html",
  "https://infocom.vn/cong-ty-tnhh-san-xuat-thuong-mai-dich-vu-dang-van-0318167138.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-xay-dung-ut-nguyen-0318257744.html",
  "https://infocom.vn/cong-ty-tnhh-sxtm-le-gia-0318444303.html",
  "https://infocom.vn/cong-ty-tnhh-mtv-thuong-mai-dich-vu-binh-tan-an-0318168043.html",
  "https://infocom.vn/cong-ty-tnhh-tmdv-van-tai-anh-sao-0317056516.html",
  "https://infocom.vn/cong-ty-tnhh-trung-tam-do-hoa-vi-tinh-kikukawa-0305263476.html",
  "https://infocom.vn/cong-ty-tnhh-visadreams-0318436101.html",
  "https://infocom.vn/cong-ty-tnhh-arusu-japan-visa-0318230090.html",
  "https://infocom.vn/cong-ty-tnhh-dau-tu-va-thuong-mai-phan-dang-group-0316276999.html",
  "https://infocom.vn/cong-ty-co-phan-xay-dung-va-thuong-mai-song-dat-0302414261.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-san-xuat-xuat-nhap-khau-minh-phat-aqua-0318262670.html",
  "https://infocom.vn/cong-ty-tnhh-de-che-qua-tang-0315506865.html",
  "https://infocom.vn/cong-ty-tnhh-luong-thuc-nam-bo-0318174939.html",
  "https://infocom.vn/cong-ty-tnhh-phat-trien-xay-dung-trdcons-0318405505.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-san-xuat-thinh-xuong-0314397927.html",
  "https://infocom.vn/cong-ty-tnhh-dung-dung-vina-0318220180.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-xay-dung-ha-thy-0318359577.html",
  "https://infocom.vn/cong-ty-tnhh-nynoland-0315027291.html",
  "https://infocom.vn/cong-ty-tnhh-mot-thanh-vien-may-mac-thanh-tai-0318429584.html",
  "https://infocom.vn/cong-ty-cp-o-to-va-van-tai-an-vui-0313122662.html",
  "https://infocom.vn/cong-ty-tnhh-tien-thanh-plaza-0316381023.html",
  "https://infocom.vn/cong-ty-co-phan-japan-solutions-0313873718.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-va-dich-vu-gia-cong-det-may-the-tuan-0318258875.html",
  "https://infocom.vn/cong-ty-tnhh-jjhanh-global-0318436045.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-san-xuat-giay-tam-huynh-de-0318430621.html",
  "https://infocom.vn/cong-ty-tnhh-dv-tm-ly-phat-0318231087.html",
  "https://infocom.vn/cong-ty-tnhh-ngoc-tin-phat-3702672833.html",
  "https://infocom.vn/cong-ty-tnhh-tm-dv-van-chuyen-tan-hoang-dung-0318146868.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-quang-cao-dat-thanh-0318180185.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-bymy-cosmetic-0318124991.html",
  "https://infocom.vn/cong-ty-co-phan-dau-tu-va-xay-dung-vinaincon-6-0311090077.html",
  "https://infocom.vn/cong-ty-tnhh-illumina-sky-ads-0318202992.html",
  "https://infocom.vn/cong-ty-tnhh-tm-dv-bao-bi-hoa-chat-va-nhua-kha-han-0318345535.html",
  "https://infocom.vn/cong-ty-tnhh-dau-tu-xay-dung-sat-thep-hung-thinh-0318362851.html",
  "https://infocom.vn/cong-ty-tnhh-ca-phe-ngoc-luan-0318270801.html",
  "https://infocom.vn/cong-ty-tnhh-f-care-pharma-0318157919.html",
  "https://infocom.vn/cong-ty-tnhh-xay-dung-va-thiet-ke-vinh-quang-0318273506.html",
  "https://infocom.vn/cong-ty-tnhh-booking365-viet-nam-0318257303.html",
  "https://infocom.vn/cong-ty-tnhh-du-lich-carpio-0317154062.html",
  "https://infocom.vn/cong-ty-tnhh-co-dau-an-do-0318205295.html",
  "https://infocom.vn/cong-ty-tnhh-fvn-vina-0318199901.html",
  "https://infocom.vn/cong-ty-co-phan-thiet-bi-va-cong-nghe-lifelabs-0310905898.html",
  "https://infocom.vn/cong-ty-tnhh-xay-dung-bat-dong-san-forseti-0316557559.html",
  "https://infocom.vn/cong-ty-tnhh-vinpac-viet-nam-0318372338.html",
  "https://infocom.vn/cong-ty-tnhh-dich-vu-bao-tri-thuan-thanh-0318414813.html",
  "https://infocom.vn/cong-ty-tnhh-oasis-care-0318370651.html",
  "https://infocom.vn/cong-ty-tnhh-thuc-pham-nam-tran-0318245717.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-xay-dung-va-dich-vu-mita-0303179740.html",
  "https://infocom.vn/cong-ty-co-phan-lien-ket-thien-ha-0312364549.html",
  "https://infocom.vn/cong-ty-tnhh-mtv-elite-prosperity-0318415599.html",
  "https://infocom.vn/cong-ty-tnhh-etoile-dore-0318414517.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-xay-dung-dien-phuong-0318414884.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-quang-minh-vina-0318413880.html",
  "https://infocom.vn/cong-ty-co-phan-starus-motor-viet-nam-0313871781.html",
  "https://infocom.vn/cong-ty-tnhh-dau-tu-va-phat-trien-winpro-0318209490.html",
  "https://infocom.vn/cong-ty-tnhh-tinicom-0318415013.html",
  "https://infocom.vn/cong-ty-tnhh-san-xuat-thuong-mai-dich-vu-xuat-nhap-khau-kfan-commercial-kitchen-equipment-0318416987.html",
  "https://infocom.vn/cong-ty-tnhh-igin-vietnam-0318271474.html",
  "https://infocom.vn/cong-ty-trach-nhiem-huu-han-giao-duc-nguyen-khuyen-unilife-0316851085.html",
  "https://infocom.vn/cong-ty-tnhh-dich-vu-sua-chua-kinh-doanh-dien-lanh-minh-ngo-ngoc-0318110124.html",
  "https://infocom.vn/cong-ty-tnhh-tmdv-indochine-castle-0318154298.html",
  "https://infocom.vn/cong-ty-tnhh-thiet-bi-va-truyen-thong-tran-gia-0313794015.html",
  "https://infocom.vn/cong-ty-tnhh-nha-hang-anh-loc-0318200515.html",
  "https://infocom.vn/cong-ty-tnhh-dau-tu-va-san-xuat-nhua-01-0317118963.html",
  "https://infocom.vn/cong-ty-tnhh-jvpf-murayama-0318436768.html",
  "https://infocom.vn/cong-ty-tnhh-ky-thuat-nam-trung-phat-0318403970.html",
  "https://infocom.vn/cong-ty-co-phan-tap-doan-melon-0317179130.html",
  "https://infocom.vn/cong-ty-tnhh-son-thai-canh-buom-0317938772.html",
  "https://infocom.vn/cong-ty-co-phan-giao-dich-hang-hoa-son-tin-0309139367.html",
  "https://infocom.vn/cong-ty-tnhh-sat-thep-va-xay-dung-xuan-gia-loc-0317968061.html",
  "https://infocom.vn/cong-ty-tnhh-mtv-vietnamese-ventures-0318178651.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-khach-san-hoa-hong-0318304810.html",
  "https://infocom.vn/cong-ty-tnhh-a-au-tan-0318279498.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-thien-luy-3603568528.html",
  "https://infocom.vn/cong-ty-tnhh-ha-ngan-tin-0318354963.html",
  "https://infocom.vn/cong-ty-tnhh-dau-tu-phat-trien-nong-nghiep-asian-0318411410.html",
  "https://infocom.vn/cong-ty-co-phan-gds-holding-0318167272.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dtpt-vuong-phat-0318218015.html",
  "https://infocom.vn/cong-ty-tnhh-champaca-lumber-0318223960.html",
  "https://infocom.vn/cong-ty-tnhh-dau-tu-va-phat-trien-sam-0318444014.html",
  "https://infocom.vn/cong-ty-tnhh-donkey-beverage-0316695654.html",
  "https://infocom.vn/cong-ty-tnhh-tm-dv-sx-nhua-hung-phat-0314892706.html",
  "https://infocom.vn/cong-ty-tnhh-cks-tuong-nguyen-0318151258.html",
  "https://infocom.vn/cong-ty-tnhh-ngo-chi-thanh-0316846670.html",
  "https://infocom.vn/cong-ty-tnhh-ca-canh-xuat-nhap-khau-nxn-aquatics-vn-0318342118.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-van-da-loc-0318391813.html",
  "https://infocom.vn/cong-ty-tnhh-san-xuat-va-thuong-mai-great-clean-0318247552.html",
  "https://infocom.vn/cong-ty-tnhh-san-xuat-thuong-mai-nhom-kinh-tuan-phat-0318153008.html",
  "https://infocom.vn/cong-ty-tnhh-y-phi-0318384340.html",
  "https://infocom.vn/cong-ty-tnhh-mannan-0318267051.html",
  "https://infocom.vn/cong-ty-tnhh-tu-van-thiet-ke-xay-dung-kim-ngan-0318170243.html",
  "https://infocom.vn/cong-ty-tnhh-kinh-doanh-va-dich-vu-q-0313818298.html",
  "https://infocom.vn/cong-ty-tnhh-agro-poultry-international-vietnam-0318144740.html",
  "https://infocom.vn/cong-ty-tnhh-cong-nghe-jfu-0318435108.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-xuat-nhap-khau-thien-thien-0318435147.html",
  "https://infocom.vn/cong-ty-tnhh-qualgo-technologies-vietnam-0318435394.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-phi-dung-0318435690.html",
  "https://infocom.vn/cong-ty-tnhh-tiem-toc-binh-dan-0318435122.html",
  "https://infocom.vn/cong-ty-tnhh-phat-trien-quang-luc-0318436302.html",
  "https://infocom.vn/cong-ty-tnhh-hanext-technology-0318435637.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-kinphar-0318436327.html",
  "https://infocom.vn/cong-ty-tnhh-tm-dv-van-tai-tan-thien-phu-0318436542.html",
  "https://infocom.vn/cong-ty-tnhh-dau-tu-du-lich-gia-khang-0318435605.html",
  "https://infocom.vn/cong-ty-tnhh-nong-lam-ngu-nghiep-golden-0318435115.html",
  "https://infocom.vn/cong-ty-tnhh-san-xuat-du-che-hoang-tung-0318435179.html",
  "https://infocom.vn/cong-ty-co-phan-megadent-0318435073.html",
  "https://infocom.vn/cong-ty-tnhh-dau-tu-thuong-mai-dich-vu-anh-kim-0318435228.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-nong-san-sach-loc-phat-0318435267.html",
  "https://infocom.vn/cong-ty-tnhh-mot-thanh-vien-bat-dong-san-hoi-tu-0318435274.html",
  "https://infocom.vn/cong-ty-tnhh-mtv-thuong-mai-dich-vu-truong-thai-0318090742.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-khai-trong-0318434626.html",
  "https://infocom.vn/cong-ty-co-phan-dau-tu-va-giai-phap-doanh-nghiep-vnglobal-0318434457.html",
  "https://infocom.vn/cong-ty-co-phan-phat-trien-do-thi-sai-gon-xanh-0318434601.html",
  "https://infocom.vn/cong-ty-co-phan-dau-tu-phat-trien-ha-tang-dai-thanh-0318434425.html",
  "https://infocom.vn/cong-ty-tnhh-thuong-mai-dich-vu-xay-dung-trang-tri-noi-that-ngoc-minh-0318432266.html",
  "https://infocom.vn/cong-ty-co-phan-truyen-thong-cmi-0318167610.html",
  "https://infocom.vn/cong-ty-tnhh-thoi-trang-phuoc-thanh-0318275479.html",
  "https://infocom.vn/doanh-nghiep-tu-nhan-vang-dich-vu-cam-do-duc-thinh-0318432202.html",
  "https://infocom.vn/cong-ty-co-phan-nang-luong-va-dich-vu-thai-binh-duong-0318236487.html",
  "https://infocom.vn/cong-ty-tnhh-san-xuat-thuong-mai-may-mac-tien-tai-0318434256.html",
  "https://infocom.vn/cong-ty-tnhh-dau-tu-tm-dv-sx-quang-minh-0318434288.html",
  "https://infocom.vn/cong-ty-tnhh-dich-vu-in-an-quang-cao-thu-trieu-0318433809.html",
  "https://infocom.vn/cong-ty-tnhh-in-an-quang-cao-seven-colors-0318433816.html",
  "https://infocom.vn/cong-ty-tnhh-mtv-hoang-thien-anh-0318431449.html",
];
app.get("/company-bocaocongty", async (req, res) => {
  const url = "https://www.bocaocongty.com/";
  const result = [];

  // Define a function to handle individual requests
  const fetchData = async (item) => {
    return new Promise((resolve, reject) => {
      request(url + item, async function (error, response, html) {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          const title = $(`td[itemprop="name"]`).text();
          const phone = $(`td[itemprop="telephone"] em`).text();
          const legalName = $(`span[itemprop="legalName"]`).text();
          const address = $(`td[itemprop="streetAddress"] span`).text();
          // const career = $(`.table-taxinfo td a`).text();

          result.push({
            title: title,
            phone: phone,
            legalName: legalName,
            address: address,
          });
          resolve();
        } else {
          reject(error);
        }
      });
    });
  };

  // Loop through the data array and make requests at 200ms intervals
  for (const item of data) {
    await fetchData(item);
    await new Promise((resolve) => setTimeout(resolve, 50)); // Pause for 200ms
    console.log(result.length);
  }

  res.send(result);
});

app.get("/company-infocom", async (req, res) => {
  const result = [];
  const fetchData = async (item) => {
    return new Promise((resolve, reject) => {
      request(item, async function (error, response, html) {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          const time = $(".preivew-news-home span.text-primary")
            .text()
            .slice(0, 10);
          const title = $("h1").text().trim();
          const phone = $("td a.fw-bold").text();
          const legalName = $("td strong").text();
          const address = $(".table-info tr:nth-child(4) td:nth-child(1)")
            .text()
            .includes("Địa chỉ trụ sở chính:")
            ? $(".table-info tr:nth-child(4) td:nth-child(2)").text()
            : $(".table-info tr:nth-child(3) td:nth-child(1)")
                .text()
                .includes("Địa chỉ trụ sở chính:")
            ? $(".table-info tr:nth-child(3) td:nth-child(2)").text()
            : "";

          result.push({
            time: time,
            title: title,
            phone: phone,
            legalName: legalName,
            address: address,
          });
          resolve();
        } else {
          reject(error);
        }
      });
    });
  };
  for (const item of data) {
    await fetchData(item);
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log(result.length);
  }
  res.send(result);
});

app.get("/company-infocom-hcm", async (req, res) => {
  const result = [];
  const fetchData = async (item) => {
    return new Promise((resolve, reject) => {
      request(item, async function (error, response, html) {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          const title = $("h1").text().trim();
          const phone = $("li.phone-review-paging a").text();
          const legalName = $("td strong").text();
          const address =
            $(".content-review-paging li:nth-child(1)").text().trim() || "";
          const link = item;

          result.push({
            title: title,
            phone: phone,
            legalName: legalName,
            address: address,
            link: link,
          });
          resolve();
        } else {
          reject(error);
        }
      });
    });
  };
  for (const item of data) {
    await fetchData(item);
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log(result.length);
  }
  res.send(result);
});
app.listen(3000);
