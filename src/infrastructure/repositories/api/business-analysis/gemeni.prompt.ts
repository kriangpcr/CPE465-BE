import { BusinessIdeaDto } from "@domain/repositories/api/businessanalysis.interface";

export const GEMINI_PROMPT = (data: BusinessIdeaDto) => `คุณคือผู้เชี่ยวชาญด้าน Business Strategy, Food Industry Consultant และ Startup Advisor ที่มีประสบการณ์ในตลาดประเทศไทย

วิเคราะห์ไอเดียธุรกิจอาหารต่อไปนี้อย่างลึกซึ้ง รอบด้าน และสมจริง:
"${data.idea}"

ให้วิเคราะห์โดยอิงบริบทประเทศไทยเท่านั้น และต้องใช้ข้อมูลเชิงเศรษฐกิจ สังคม และพฤติกรรมผู้บริโภคจริงประกอบ

ปัจจัยที่ต้องใช้ในการประเมิน (ต้องสะท้อนใน score และคำตอบ):

1. พฤติกรรมผู้บริโภคไทย (Consumer Behavior)

* ความถี่ในการกินอาหารนอกบ้าน / เดลิเวอรี่
* ความอ่อนไหวด้านราคา
* ความนิยม convenience vs quality
* ความเชื่อเรื่องสุขภาพ / อาหารปลอดภัย

2. Gold Standard Mental ของผู้บริโภคไทย

* ความสะอาด (Food Hygiene)
* ความปลอดภัย (Food Safety / อย.)
* ความคุ้มค่า (Value for money)
* รสชาติ (Taste localization)
* ความน่าเชื่อถือของแบรนด์

3. บริบทเศรษฐกิจ (Economic Context)

* GDP ไทยและกำลังซื้อของประชากร
* ความเหลื่อมล้ำรายได้
* ต้นทุนวัตถุดิบในประเทศ
* ค่าแรงขั้นต่ำ / ค่าเช่า

4. บริบททางสังคม (Social Trends)

* Urbanization (คนเมือง)
* Aging Society (ผู้สูงอายุ)
* Working Class / มนุษย์เงินเดือน
* ครอบครัวเดี่ยว vs ครอบครัวใหญ่

5. บริบทวัฒนธรรมไทย (Cultural Context)

* รสนิยมอาหารไทย (จัดจ้าน / หวาน / มัน)
* การกินร่วมกัน (sharing culture)
* เทศกาล (สงกรานต์ / Ramadan / Vegetarian Festival)
* ความเชื่อเรื่องอาหาร (มงคล / สุขภาพ / ฮาลาล)

6. ศาสนา เชื้อชาติ และข้อจำกัดอาหาร

* Muslim (Halal)
* Buddhist (บางช่วงกินเจ)
* Chinese-Thai food preference
* ความเสี่ยง mismatch เช่น “หมู” กับกลุ่มมุสลิม

7. การแบ่งกลุ่มผู้บริโภค (Segmentation)
   ต้องวิเคราะห์แยกตาม:

* Gen Z
* Gen Y (Millennials)
* Gen X
* Baby Boomers

โดยแต่ละกลุ่มต้องมี:

* พฤติกรรมการกิน
* กำลังซื้อ
* ความคาดหวังสินค้า

8. การแข่งขันในตลาดอาหารไทย

* Street food vs Franchise vs Cloud kitchen
* Barrier to entry
* Differentiation จริงหรือไม่

9. ความเป็นไปได้ด้านต้นทุนและกำไร

* Food cost %
* Margin จริงในไทย
* Scalability

10. กฎหมายและมาตรฐาน

* อย.
* GMP / HACCP (ถ้ามี)
* ใบอนุญาตร้านอาหาร
* ภาษี
* Halal Certification (ถ้าจำเป็น)

11. Supply Chain ในประเทศไทย

* แหล่งวัตถุดิบ (local vs import)
* ความเสถียรของราคา
* Logistics / Cold chain

12. ความเสี่ยง

* Food poisoning
* Brand reputation
* Social media backlash
* Regulatory risk

เงื่อนไขการให้ score (สำคัญมาก):

* score ต้องสะท้อน “ความเป็นไปได้จริงในไทย”
* ห้าม bias optimistic
* ต้อง penalize ทันทีหาก:

  * ขัดกับศาสนา / วัฒนธรรม (เช่น หมู + Muslim market)
  * ต้นทุนสูงแต่ราคาขายต่ำ
  * ไม่ตอบโจทย์พฤติกรรมคนไทย
* ต้องมีเหตุผลเชิงระบบ (ไม่ใช่ความรู้สึก)

รูปแบบ JSON ที่ต้องตอบ:

{
"score": number,
"reasons": {
"strengths": string[],
"weaknesses": string[]
},
"canvas": {
"keyPartners": string[],
"keyActivities": string[],
"keyResources": string[],
"valuePropositions": string[],
"customerRelationships": string[],
"channels": string[],
"customerSegments": string[],
"costStructure": string[],
"revenueStreams": string[]
},
"strategies": string[]
}

ข้อกำหนด:

* ตอบเป็น JSON object เท่านั้น
* ตอบเป็นภาษาไทยเท่านั้น
* ห้ามมีข้อความอื่นนอกจาก JSON
* ทุก field ต้องมีอย่างน้อย 4 รายการ
* strategies ต้องเป็น actionable (ทำได้จริงในไทย) และมี 3 รายการ
* Business Model Canvas ต้องเชื่อมโยงกันทั้งระบบ

`;