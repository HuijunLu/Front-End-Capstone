

const mockResponse = {
    data: {

        "product_id": "37311",
        "results": [
            {
                "question_id": 573459,
                "question_body": "this looks fun to wear is it fun?",
                "question_date": "2022-02-19T00:00:00.000Z",
                "asker_name": "barry johnson",
                "question_helpfulness": 26,
                "reported": false,
                "answers": {
                    "5361114": {
                        "id": 5361114,
                        "body": "its aight",
                        "date": "2022-02-25T00:00:00.000Z",
                        "answerer_name": "test",
                        "helpfulness": 6,
                        "photos": []
                    },
                    "5361119": {
                        "id": 5361119,
                        "body": "mabye",
                        "date": "2022-02-25T00:00:00.000Z",
                        "answerer_name": "maybe",
                        "helpfulness": 0,
                        "photos": []
                    },
                    "5361122": {
                        "id": 5361122,
                        "body": "tjat cat is big",
                        "date": "2022-02-25T00:00:00.000Z",
                        "answerer_name": "bigcat",
                        "helpfulness": 0,
                        "photos": []
                    },
                    "5361123": {
                        "id": 5361123,
                        "body": "test",
                        "date": "2022-02-25T00:00:00.000Z",
                        "answerer_name": "test",
                        "helpfulness": 0,
                        "photos": []
                    },
                    "5361132": {
                        "id": 5361132,
                        "body": "test",
                        "date": "2022-02-25T00:00:00.000Z",
                        "answerer_name": "test",
                        "helpfulness": 0,
                        "photos": [
                            "https://picsum.photos/200/300"
                        ]
                    },
                    "5361133": {
                        "id": 5361133,
                        "body": "test",
                        "date": "2022-02-25T00:00:00.000Z",
                        "answerer_name": "test",
                        "helpfulness": 1,
                        "photos": []
                    },
                    "5361152": {
                        "id": 5361152,
                        "body": "this is tesst",
                        "date": "2022-02-25T00:00:00.000Z",
                        "answerer_name": "tesst",
                        "helpfulness": 0,
                        "photos": []
                    }
                }
            }
        ]

    }

}



export default {
    get: jest.fn().mockResolvedValue(mockResponse)
}
