# 拡大用イラストの制作記録

2026-10-07。内蔵 image_gen を使用。服の4画像は変更していません。

保存先: `assets/detail-heart.png`, `assets/detail-kidney.png`, `assets/detail-brain.png`, `assets/detail-lungs.png`, `assets/detail-eye.png`, `assets/detail-ear.png`, `assets/detail-skin.png`。

画像を目視し、表示する部位に赤丸の座標を合わせています。生成画像は学習用の模式的な医療イラストです。組織の色や各部位の大きさは表現上の強調を含み、細部まで専門家による監修が完了した画像ではありません。

骨盤内の新規画像は生成サービスの安全判定で拒否されたため、画像生成を再試行せず既存の男女別模式図を保持しています。

## 確認に使用した資料

- [OpenStax: 腎臓の構造](https://openstax.org/books/biology-2e/pages/41-2-the-kidneys-and-osmoregulatory-organs)
- [OpenStax: 肺の構造](https://openstax.org/books/anatomy-and-physiology-2e/pages/22-2-the-lungs)
- [OpenStax: 男性生殖器](https://openstax.org/books/anatomy-and-physiology/pages/27-1-anatomy-and-physiology-of-the-male-reproductive-system)
- [OpenStax: 女性生殖器](https://openstax.org/books/anatomy-and-physiology/pages/27-2-anatomy-and-physiology-of-the-female-reproductive-system)

## 生成プロンプト

心臓・腎臓の共通条件:

> Create one square high-resolution realistic medical textbook illustration for an interactive anatomy app. Natural tissue texture, detailed anatomical geometry, subtle soft 3D shading and fine vessels, clean isolated specimen on solid warm ivory #fbfaf5. Complete organ visible with 8% margins. No text, letters, numbers, labels, arrows, markers, borders, human body, hands, or props. Educational illustration, not surgery, no gore.

心臓:

> Subject: human heart frontal coronal cutaway, anatomically realistic asymmetric heart, four chambers visible, anatomical right on viewer left, thinner right ventricle on viewer left and thick muscular left ventricle on viewer right, atria above ventricles, valves and chordae tendineae, curved aortic arch superiorly with three branches, pulmonary trunk anterior to aorta. Muted red muscle, natural pale valve tissue; blue major venous vessels as conventional educational color coding.

腎臓:

> Subject: one human kidney cut longitudinally in coronal plane; outer convex border on viewer left, renal hilum on right. Visible thin capsule, reddish outer cortex, 7-9 striated medullary pyramids pointed inward into small calyces, branching cream collecting system converging into renal pelvis at center-right, continuous single ureter descending down right. Renal artery and vein exit right. Real organ proportions, warm red-brown tissue with fibrous striations, no duplicate kidney.

その他5画像の共通条件:

> One square high resolution realistic medical textbook illustration for an interactive anatomy app. Fine natural tissue textures, anatomically detailed model with soft dimensional shading. Isolated on solid warm ivory #fbfaf5, entire subject in frame with margin. No text, labels, letters, arrows, numbered markers, borders, hands, body, or props. No surgery or gore.

脳:

> Human brain left lateral view, frontal pole points viewer left, posterior pole viewer right. Detailed cerebral gyri and sulci, restrained tinting to distinguish frontal lobe anterior, parietal lobe superior posterior to central sulcus, temporal lobe lower lateral, occipital lobe posterior. Cerebellum below posterior cerebrum on viewer right has fine parallel folia rather than cerebral folds, brainstem descends centrally below brain. Natural pale salmon tissue with slight color variation, not rainbow. Show all lobes and stem clearly.

肺:

> Human lungs anterior view with trachea and branching bronchi. Anatomical right lung on viewer left has three lobes separated by one horizontal and one oblique fissure. Anatomical left lung on viewer right has two lobes separated by oblique fissure and medial cardiac notch. Subtle transparent cutaway on central lung tissue exposes realistic bronchial tree. Separate small circular magnified inset at bottom right shows grape-like alveolar air sacs and fine capillary mesh joined to a small bronchiole. Keep inset detached from main lung. Natural muted pink tissue, cartilage tracheal rings.

目:

> Human eyeball sagittal cross-section in profile. Cornea at viewer left, optic nerve exits at viewer right. A spherical eye, not an almond-shaped external eye. Curved transparent cornea, anterior chamber, thin iris seen edge-on immediately in front of a clear biconvex lens, ciliary body around lens, large vitreous cavity, thin retinal lining inside the choroid and sclera, optic nerve continuous with the retina. Detailed realistic tissue, no eyelashes or lids, no extra eye. Entire eye and nerve within margins.

耳:

> Human ear anatomical cutaway viewed from front-oblique side: external auricle on viewer left, external auditory canal runs right into oblique tympanic membrane, three tiny articulated ossicles behind membrane connect into oval window, cochlea spiral on right, semicircular canals above cochlea, auditory tube descends below middle ear. Fine realistic temporal bone cutaway around middle ear, muted pale bone and salmon tissue. Proportions like a medical atlas, no decorative disconnected balls for ossicles, no head outline.

皮膚:

> A rectangular 3D cutaway block of human skin showing epidermis as thin top layer, dermis as thicker salmon middle layer, and yellow lobulated subcutaneous adipose at bottom. One oblique hair follicle left of center extends from surface into deep dermis, lobulated sebaceous gland connects to upper follicle, coiled eccrine sweat gland to right with duct going up to surface, branching yellow sensory nerve endings and red/blue blood vessels in lower dermis. Three-quarter perspective with broad front cut face clearly showing layers. Realistic biological tissue texture, not geometric flat bands, no body or external intimate anatomy.
