import glob
import json
import os
import shutil
from os.path import join as ptj
from os import path
import cv2
import numpy as np
import tqdm
import math

cfgs = [
    {'name': 'taro', 'src': './originalImage/taro',
     'dst': './src/galleryImages/taro', 'thumbnail': './src/galleryImages/thumbnail/taro_thumbs'},
    {'name': 'hanako', 'src': './originalImage/hanako',
     'dst': './src/galleryImages/hanako', 'thumbnail': './src/galleryImages/thumbnail/hanako_thumbs'},
    {'name': 'both', 'src': './originalImage/both',
     'dst': './src/galleryImages/both', 'thumbnail': './src/galleryImages/thumbnail/both_thumbs'},
]

size_limit = 800*1000  # byte
img_max = 1024
skeleton = {'title': '', 'src': '', 'thumbnail': '', "w": 0, "h": 0}
json_file = './src/assets/components/imageList.json'

imgstaro = []
imgshanako = []
imgsBoth = []

for cfg in cfgs:
    print('current processing: {}'.format(cfg['name']))
    curr_list = glob.glob(ptj(cfg['src'], '*.png'))
    curr_list += glob.glob(ptj(cfg['src'], '*.jpg'))

    curr_list = sorted(curr_list)

    if os.path.exists(cfg['dst']):
        shutil.rmtree(cfg['dst'])
    if os.path.exists(cfg['thumbnail']):
        shutil.rmtree(cfg['thumbnail'])

    os.makedirs(cfg['dst'], exist_ok=True)
    os.makedirs(cfg['thumbnail'], exist_ok=True)

    for n, curr_img in enumerate(tqdm.tqdm(curr_list)):
        tmp = skeleton.copy()
        tmp['title'] = '{}{:03d}'.format(cfg['name'], n)
        # tmp['src'] = cfg['dst'].replace('/src', '') + '/' + tmp['title']+'.jpg'
        tmp['src'] = cfg['dst'] + '/' + tmp['title']+'.jpg'
        # tmp['thumbnail'] = cfg['thumbnail'].replace('/src', '') + '/' + tmp['title']+'.jpg'
        tmp['thumbnail'] = cfg['thumbnail'] + '/' + tmp['title']+'.jpg'

        ext = path.splitext(curr_img)[1]
        flag_resize = False

        if ext == "png":
            flag_resize = True

        if path.getsize(curr_img) > size_limit:
            flag_resize = True

        if os.path.isfile(ptj(cfg['dst'], tmp['title']+'.jpg')):
            os.remove(ptj(cfg['dst'], tmp['title']+'.jpg'))

        img: np.ndarray = cv2.imread(curr_img)
        i_sz = img.shape

        if i_sz[0] > i_sz[1]:
            o_sz = [int(round(img_max*i_sz[0]/i_sz[1])), img_max]
        else:
            o_sz = [img_max, int(round(img_max*i_sz[1]/i_sz[0]))]

        img = cv2.resize(img, dsize=(o_sz[1], o_sz[0]))
        cv2.imwrite(ptj(cfg['dst'], tmp['title']+'.jpg'), img)

        offsets = [int(math.ceil(o_sz[0]-img_max)/2), int(math.ceil(o_sz[1]-img_max)/2)]
        thumb_img = img[offsets[0]:offsets[0]+img_max, offsets[1]:offsets[1]+img_max]
        thumb_img = cv2.resize(thumb_img, dsize=(200, 200))
        cv2.imwrite(ptj(cfg['thumbnail'], tmp['title']+'.jpg'), thumb_img)

        tmp['h'] = o_sz[0]
        tmp['w'] = o_sz[1]

        if cfg['name'] == "taro":
            imgstaro.append(tmp)
        elif cfg['name'] == "both":
            imgsBoth.append(tmp)
        elif cfg['name'] == "hanako":
            imgshanako.append(tmp)


ret = {
    "imgstaro": imgstaro,
    "imgshanako": imgshanako,
    "imgsBoth": imgsBoth,
}

f = open(json_file, "w", encoding="utf-8")
json.dump(ret, f, ensure_ascii=False, indent=4)
f.close()



