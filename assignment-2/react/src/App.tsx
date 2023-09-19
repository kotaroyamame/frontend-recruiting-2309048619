import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import './App.css'
import { useState } from 'react'
import { Form1__Post } from './api/index'
import type { Form1 } from './api/apiTypes'
type FormDataValue = {
  data: string
  valid: boolean
  inValid: boolean
  invalidMessage: string
  check: Function
}
type FromData = {
  [key in
    | 'name'
    | 'email'
    | 'zip'
    | 'prefecture'
    | 'address1'
    | 'address2']: FormDataValue
}
function App () {
  const PREF_OPTIONS = [
    '北海道',
    '青森県',
    '岩手県',
    '宮城県',
    '秋田県',
    '山形県',
    '福島県',
    '茨城県',
    '栃木県',
    '群馬県',
    '埼玉県',
    '千葉県',
    '東京都',
    '神奈川県',
    '新潟県',
    '富山県',
    '石川県',
    '福井県',
    '山梨県',
    '長野県',
    '岐阜県',
    '静岡県',
    '愛知県',
    '三重県',
    '滋賀県',
    '京都府',
    '大阪府',
    '兵庫県',
    '奈良県',
    '和歌山県',
    '鳥取県',
    '島根県',
    '岡山県',
    '広島県',
    '山口県',
    '徳島県',
    '香川県',
    '愛媛県',
    '高知県',
    '福岡県',
    '佐賀県',
    '長崎県',
    '熊本県',
    '大分県',
    '宮崎県',
    '鹿児島県',
    '沖縄県'
  ]
  const [validated, setValidated] = useState(false)
  const [formdata, setFormdata] = useState<FromData>({
    name: {
      data: '',
      valid: false,
      inValid: false,
      invalidMessage: '',
      check: (s: string, self: FormDataValue) => {
        self.data = s
        self.invalidMessage = ''
        self.valid = true
        self.inValid = false
        if (s.length <= 0) {
          self.invalidMessage = '名前が入力されていません'
          self.valid = false
          self.inValid = true
        }
      }
    },
    email: {
      data: '',
      valid: false,
      inValid: false,
      invalidMessage: '',
      check: (s: string, self: FormDataValue) => {
        self.data = s
        const regex =
          /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
        self.invalidMessage = ''
        self.valid = true
        self.inValid = false
        if (!regex.test(s)) {
          self.invalidMessage = '正しいメールアドレスを入力してください'
          self.valid = false
          self.inValid = true
        }
      }
    },
    zip: {
      data: '',
      valid: false,
      inValid: false,
      invalidMessage: '',
      check: (s: string, self: FormDataValue) => {
        self.data = s
        const regex = /^\d{7}$/
        self.invalidMessage = ''
        self.valid = true
        self.inValid = false
        if (!regex.test(s)) {
          self.invalidMessage = '半角数字で入力してください'
          const regex2 = /-/
          if (regex2.test(s)) {
            self.invalidMessage = 'ハイフンを含めず半角数字で入力してください'
          }
          self.valid = false
          self.inValid = true
        }
      }
    },
    prefecture: {
      data: '',
      valid: false,
      inValid: false,
      invalidMessage: '',
      check: (s: string, self: FormDataValue) => {
        self.data = s
        self.invalidMessage = ''
        self.valid = true
        self.inValid = false
      }
    },
    address1: {
      data: '',
      valid: false,
      inValid: false,
      invalidMessage: '',
      check: (s: string, self: FormDataValue) => {
        self.data = s
        self.invalidMessage = ''
        self.valid = true
        self.inValid = false
      }
    },
    address2: {
      data: '',
      valid: false,
      inValid: false,
      invalidMessage: '',
      check: (s: string, self: FormDataValue) => {
        self.data = s

        self.invalidMessage = ''
        self.valid = true
        self.inValid = false
      }
    }
  })
  const handleChange = (e: any) => {
    const targetName:
      | 'name'
      | 'email'
      | 'zip'
      | 'prefecture'
      | 'address1'
      | 'address2' = e.target.name || ''
    formdata[targetName].check(e.target.value, formdata[targetName])
    setValidated(Object.values(formdata).every(d => d.valid))
    setFormdata({
      ...formdata,
      [targetName]: formdata[targetName]
    })
  }
  const submit = async (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      throw new Error(
        'Unexpected validation error:There may be multiple validation logics.'
      )
    }
    const sendFormData: any = {
      name: '',
      email: '',
      zip: '',
      prefecture: '',
      address1: ''
    }
    for (const [key, value] of Object.entries(formdata)) {
      if (key === 'address2' && value.data === '') {
        continue
      }
      sendFormData[key] = value.data
    }
    const { status, success, statusText } = await Form1__Post(sendFormData)
    if (success) {
      alert('送信完了')
    }
  }
  return (
    <>
      <div className='App'>
        <Form onSubmit={submit}>
          <Form.Group className='mb-3' controlId='Form1.ControlInput1'>
            <Form.Label>氏名</Form.Label>
            <Form.Control
              name='name'
              value={formdata.name.data}
              type='text'
              placeholder='(例)トレタ 太郎'
              onChange={handleChange}
              isValid={formdata.name.valid}
              isInvalid={formdata.name.inValid}
              required
            />
            <Form.Control.Feedback type='invalid'>
              {formdata.name.invalidMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='Form1.ControlInput2'>
            <Form.Label>Eメール</Form.Label>
            <Form.Control
              name='email'
              type='email'
              placeholder='(例)yoyaku@toreta.in'
              onChange={handleChange}
              isValid={formdata.email.valid}
              isInvalid={formdata.email.inValid}
            />
            <Form.Control.Feedback type='invalid'>
              {formdata.email.invalidMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='Form1.ControlInput3'>
            <Form.Label>郵便番号</Form.Label>
            <Form.Control
              name='zip'
              type='text'
              placeholder='(例)0000000'
              onChange={handleChange}
              isValid={formdata.zip.valid}
              isInvalid={formdata.zip.inValid}
            />
            <Form.Control.Feedback type='invalid'>
              {formdata.zip.invalidMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>都道府県</Form.Label>
            <Form.Select
              name='prefecture'
              className='mb-3'
              onChange={handleChange}
              isValid={formdata.prefecture.valid}
              isInvalid={formdata.prefecture.inValid}
            >
              <option value='' key={0}>
                選択してください
              </option>
              {PREF_OPTIONS.map((o, i) => (
                <option key={i + 1} value={o}>
                  {o}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {formdata.prefecture.invalidMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='Form1.ControlInput5'>
            <Form.Label>市区町村・番地</Form.Label>
            <Form.Control
              name='address1'
              type='text'
              placeholder='(例)品川区西五反田７丁目２２−１７'
              onChange={handleChange}
              isValid={formdata.address1.valid}
              isInvalid={formdata.address1.inValid}
            />
            <Form.Control.Feedback type='invalid'>
              {formdata.address1.invalidMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='Form1.ControlInput6'>
            <Form.Label>建物名・号室</Form.Label>
            <Form.Control
              name='address2'
              type='text'
              placeholder='(例)TOCビル8F'
              onChange={handleChange}
              isValid={formdata.address2.valid}
              isInvalid={formdata.address2.inValid}
            />
            <Form.Control.Feedback type='invalid'>
              {formdata.address2.invalidMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type='submit' disabled={!validated} onClick={submit}>
            登録
          </Button>
        </Form>
      </div>
    </>
  )
}

export default App
