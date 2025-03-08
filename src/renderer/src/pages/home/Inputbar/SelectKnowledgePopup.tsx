import { DatabaseOutlined } from '@ant-design/icons'
import { useAppSelector } from '@renderer/store'
import { KnowledgeBase } from '@renderer/types'
import { Empty, Input, List, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

const { Title } = Typography

const SelectKnowledgePopup: FC<{
  selectKnowledgeBase: (knowledgeBase: KnowledgeBase) => void
  onClose: () => void
}> = ({ selectKnowledgeBase, onClose }) => {
  const knowledgeState = useAppSelector((state) => state.knowledge)
  const [searchText, setSearchText] = useState('')
  const [filteredBases, setFilteredBases] = useState<KnowledgeBase[]>([])

  useEffect(() => {
    if (searchText) {
      setFilteredBases(
        knowledgeState.bases.filter((base) => base.name.toLowerCase().includes(searchText.toLowerCase()))
      )
    } else {
      setFilteredBases(knowledgeState.bases)
    }
  }, [searchText, knowledgeState.bases])

  return (
    <Container>
      <Header>
        <Title level={5}>Select Knowledge Base</Title>
        <SearchInput
          placeholder="Search knowledge bases..."
          prefix={<DatabaseOutlined style={{ color: 'var(--color-text-3)' }} />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          autoFocus
        />
      </Header>

      {knowledgeState.bases.length === 0 ? (
        <EmptyContainer>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No knowledge bases available" />
        </EmptyContainer>
      ) : (
        <ListContainer>
          <List
            itemLayout="horizontal"
            dataSource={filteredBases}
            renderItem={(base) => (
              <KnowledgeItem onClick={() => selectKnowledgeBase(base)}>
                <KnowledgeAvatar>
                  <DatabaseOutlined />
                </KnowledgeAvatar>
                <KnowledgeInfo>
                  <KnowledgeName>{base.name}</KnowledgeName>
                  <KnowledgeDescription>{base.description || `${base.items?.length || 0} items`}</KnowledgeDescription>
                </KnowledgeInfo>
              </KnowledgeItem>
            )}
            locale={{
              emptyText: searchText ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={`No results for "${searchText}"`} />
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No knowledge bases available" />
              )
            }}
          />
        </ListContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  background-color: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border);
  overflow: hidden;
  max-height: 320px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Header = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-background-soft);

  h5 {
    margin: 0 0 8px 0;
    font-weight: 500;
  }
`

const SearchInput = styled(Input)`
  border-radius: 8px;

  &.ant-input-affix-wrapper {
    padding: 6px 10px;
  }
`

const EmptyContainer = styled.div`
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ListContainer = styled.div`
  overflow-y: auto;
  max-height: 240px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-text-4);
    border-radius: 3px;
  }
`

const KnowledgeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-background-soft);
  }
`

const KnowledgeAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: var(--color-primary-lighter);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-primary);
  font-size: 18px;
  margin-right: 12px;
`

const KnowledgeInfo = styled.div`
  flex: 1;
  overflow: hidden;
`

const KnowledgeName = styled.div`
  font-weight: 500;
  color: var(--color-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const KnowledgeDescription = styled.div`
  font-size: 12px;
  color: var(--color-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default SelectKnowledgePopup
