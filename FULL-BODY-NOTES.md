# 全身画像の更新（2026-10-08）

内蔵 image_gen を使用。採用画像は `assets/full-{skin,bone,organ}-{male,female}.png` の6枚。各画像の左が正面、右が背面で、画面では片側だけを表示します。服・拡大図の画像は変更していません。

皮膚・骨格・臓器の3層を変更しました。筋肉は生成サービスの安全判定で停止し、再試行していません。ネットワークの候補画像は、不要な皮膚表現と個別系統を分離できない問題から不採用。筋肉・ネットワークは既存SVGを維持しています。したがって全層の置換は未完了です。

画像はAI生成の学習用イラストで、医療用写真・監修済み解剖図ではありません。隠れた器官のマーカーは位置の目安です。皮膚モデルの胸部・骨盤部には衣類があり、衣類下の構造の外観は示しません。臓器画像には生殖器の細部を描かず、既存の骨盤内拡大図へ遷移できます。各骨の赤丸は画像に合わせて個別に再配置。選択領域の色と赤丸の点滅、カードを開く二段階操作を維持しています。

画像単体の目視、JavaScript構文検査、24通りの描画・対象ID・既存拡大図・相対画像パスを自動検証。ブラウザーでの最終見た目とタッチ操作の再検証は未実施です。

今後の改善: 専門家による画像・マーカー位置の監修、筋肉の実画像素材と系統別に分離されたネットワーク素材の導入。

## 採用画像のプロンプト

以下で sex は male / female に展開して各1回生成。

### 骨格

Scientific educational medical atlas plate, high resolution square image. Exactly two full-body standing adult anatomical figures side by side, same person front view on LEFT and back view on RIGHT. Entire head, fingers and feet visible. Neutral anatomical pose, arms slightly abducted 18 degrees, feet slightly apart. Left figure center at 25% canvas width, right figure center at 75%. Head top at 4% canvas height, feet at 96%. Each figure stays entirely inside its own half, with clear space between. Realistic detailed 3D medical textbook rendering, subtle soft lighting, fine texture. Solid warm ivory background #fbfaf5, no text, labels, arrows, borders, dots or props.

Adult {sex} anatomy; {female: female proportions, narrower shoulders and broader pelvic structure / male: male proportions, broader shoulders and narrower pelvis}.

Complete human skeleton only, no skin, soft tissue or organs. Anatomically plausible skull, spine, rib cage, shoulder girdle, arms with paired radius and ulna, articulated fingers, pelvis, femurs, patellae on FRONT only, tibiae and fibulae, articulated feet. BACK is genuinely posterior: occiput, scapular spines and spinous processes visible, not a flipped front. Natural ivory bone with pores, subtle shadows and realistic articulations. No duplicate or missing limbs.

### 臓器

Scientific educational full-body atlas, square canvas, two figures front LEFT and posterior BACK RIGHT. Entire head to feet visible. Centers at 25% and 75% canvas width; each confined to own half. Realistic 3D medical textbook textures. Ivory background, no labels or text. Adult {sex} anatomy. Internal thoracic and abdominal organs within a thin neutral gray skeletal outline, no skin. Brain, lungs, heart, liver, stomach, intestines, kidneys, bladder. Posterior view shows posterior relationships with kidneys and spine emphasized. Pelvis represented by skeletal structure, no reproductive details.

### 皮膚

Scientific educational external surface anatomy reference, realistic adult Japanese {sex}, full body front on LEFT and back on RIGHT in square canvas. Opaque gray sports shorts {female only: and opaque gray sports bra}, bare arms and legs, no shoes. Natural skin texture, neutral face, black hair. Anatomical standing pose arms slightly away from body. Each figure inside its own half, centered at 25% and 75%, head top 4%, feet 96%. Ivory background, no text or labels. No internal organs shown.

## 公開

配布ZIPを解凍し、中の全ファイル・assetsフォルダーを同じ階層のままGitHubリポジトリへアップロードします。index.htmlが公開フォルダーの直下にあることを確認し、GitHub Pagesの公開元ブランチ・フォルダーを設定してください。アップロードだけではPagesが有効にならない場合があります。ビルドは不要です。
